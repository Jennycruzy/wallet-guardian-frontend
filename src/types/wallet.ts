export interface RiskSignal {
  id: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  explanation: string;
  action: string;
}

export interface ScamToken {
  name: string;
  symbol: string;
  riskLevel: "low" | "medium" | "high";
  explanation: string;
}

export interface CloneWallet {
  address: string;
  similarity: number;
  riskLevel: "low" | "medium" | "high";
}

export interface Approval {
  contractName: string;
  contractAddress: string;
  amount: string;
  riskLevel: "low" | "medium" | "high";
}

export interface TimelineEvent {
  id: string;
  date: string;
  description: string;
  type: "warning" | "danger" | "info";
}

// --- NEW: Added for OpenGradient TEE support ---
export interface VerifiableProof {
  transactionHash: string;
  teeProvider: string;
  explorerUrl: string;
}

export interface ScanResult {
  walletAddress: string;
  walletRiskScore: number;
  riskLevel: "low" | "moderate" | "high" | "critical";
  riskSignals: RiskSignal[];
  scamTokens: ScamToken[];
  cloneWallets: CloneWallet[];
  approvals: Approval[];
  timelineEvents: TimelineEvent[];
  aiExplanation: string;
  // --- NEW: Integrated proof property ---
  verifiableProof?: VerifiableProof; 
}