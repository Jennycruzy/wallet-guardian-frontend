import type { ScanResult } from "@/types/wallet";

/**
 * For Vercel/Production: Set VITE_API_URL in your Vercel Dashboard.
 * Example: https://your-backend-name.onrender.com/api/v1
 */
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

export async function scanWallet(walletAddress: string): Promise<ScanResult> {
  try {
    console.log(`🚀 Initiating scan at: ${API_BASE}/scan-wallet`);

    const response = await fetch(`${API_BASE}/scan-wallet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Backend expects snake_case 'wallet_address'
      body: JSON.stringify({ 
        wallet_address: walletAddress,
        chain: "ethereum" 
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend Error Response:", errorText);
      throw new Error(`Scan failed: ${response.status}`);
    }

    const data = await response.json();

    /**
     * DATA MAPPING BRIDGE
     * Converts Python's snake_case to your TypeScript camelCase interfaces.
     */
    return {
      walletAddress: data.wallet_address || walletAddress,
      walletRiskScore: data.wallet_risk_score ?? 0,
      riskLevel: data.risk_level || "low",
      riskSignals: (data.risk_signals || []).map((s: any) => ({
        id: s.id || Math.random().toString(),
        title: s.title || s.description || "Risk Detected",
        severity: s.severity || "low",
        explanation: s.explanation || s.description || "No details provided.",
        action: s.action || "Standard monitoring recommended."
      })),
      scamTokens: data.scam_tokens || [],
      cloneWallets: data.clone_wallets || [],
      approvals: data.approvals || [],
      timelineEvents: data.timeline_events || [],
      aiExplanation: data.ai_explanation || "Analysis pending...",
      // The verifiable proof object from OpenGradient TEE
      verifiableProof: data.verifiable_proof 
        ? {
            transactionHash: data.verifiable_proof.transaction_hash,
            teeProvider: data.verifiable_proof.tee_provider,
            explorerUrl: data.verifiable_proof.explorer_url,
          }
        : undefined,
    } as ScanResult;

  } catch (error) {
    console.error("❌ API Connection Error:", error);
    // Rethrow to let the Dashboard component handle the error UI
    throw error;
  }
}