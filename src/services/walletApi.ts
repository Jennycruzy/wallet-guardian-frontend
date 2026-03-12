import type { ScanResult } from "@/types/wallet";

// 1. HARDCODE THE FULL RENDER DOMAIN + API PREFIX
const API_BASE = "https://wallet-guardian-backend.onrender.com/api/v1";

export async function scanWallet(walletAddress: string): Promise<ScanResult> {
  try {
    // 2. THIS COMBINES TO: https://wallet-guardian-backend.onrender.com/api/v1/scan-wallet
    const response = await fetch(`${API_BASE}/scan-wallet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        wallet_address: walletAddress,
        chain: "ethereum" 
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Scan failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

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
      verifiableProof: data.verifiable_proof 
        ? {
            transactionHash: data.verifiable_proof.transaction_hash,
            teeProvider: data.verifiable_proof.tee_provider,
            explorerUrl: data.verifiable_proof.explorer_url,
          }
        : undefined,
    } as ScanResult;

  } catch (error: any) {
    console.error("❌ API Connection Error:", error);
    throw error;
  }
}