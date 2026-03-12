import type { ScanResult } from "@/types/wallet";

export function generateMockData(walletAddress: string): ScanResult {
  const score = 68;
  return {
    walletAddress,
    walletRiskScore: score,
    riskLevel: "moderate",
    riskSignals: [
      {
        id: "1",
        title: "Suspicious Token Transfers",
        severity: "high",
        explanation: "2 tokens in your wallet match known scam airdrop patterns. These tokens may contain malicious transfer hooks.",
        action: "Do not interact with or attempt to swap these tokens.",
      },
      {
        id: "2",
        title: "Unlimited Contract Approvals",
        severity: "high",
        explanation: "1 contract has unlimited spending approval for your tokens. This could drain your wallet if the contract is compromised.",
        action: "Review and consider revoking unlimited approvals.",
      },
      {
        id: "3",
        title: "Risky Wallet Interactions",
        severity: "medium",
        explanation: "Your wallet has interacted with 1 address flagged in known scam databases.",
        action: "Avoid further transactions with flagged addresses.",
      },
      {
        id: "4",
        title: "Wallet Clone Impersonation",
        severity: "medium",
        explanation: "2 addresses found that closely mimic your wallet address. Attackers use these to trick you into sending funds.",
        action: "Always double-check full addresses before sending.",
      },
      {
        id: "5",
        title: "Suspicious Signature Requests",
        severity: "low",
        explanation: "No suspicious signature patterns detected in recent activity.",
        action: "Continue practicing safe signing habits.",
      },
    ],
    scamTokens: [
      {
        name: "USDT BONUS",
        symbol: "USDTB",
        riskLevel: "high",
        explanation: "This token resembles a fake airdrop token commonly used in phishing attacks. It mimics Tether branding to deceive users.",
      },
      {
        name: "FakeUSDC",
        symbol: "FUSDC",
        riskLevel: "high",
        explanation: "Counterfeit USDC token with a malicious transfer hook that can steal approved tokens when interacted with.",
      },
      {
        name: "AirdropBonus",
        symbol: "ADRP",
        riskLevel: "medium",
        explanation: "Unsolicited airdrop token from an unverified contract. May contain hidden approval mechanisms.",
      },
    ],
    cloneWallets: [
      {
        address: walletAddress.slice(0, 6) + "...8F1A",
        similarity: 94,
        riskLevel: "high",
      },
      {
        address: walletAddress.slice(0, 6) + "...8F1B",
        similarity: 88,
        riskLevel: "medium",
      },
    ],
    approvals: [
      {
        contractName: "Uniswap Router",
        contractAddress: "0x7a25...3d4F",
        amount: "Unlimited",
        riskLevel: "low",
      },
      {
        contractName: "Unknown Contract",
        contractAddress: "0xdEaD...bEEf",
        amount: "Unlimited",
        riskLevel: "high",
      },
      {
        contractName: "Aave V3 Pool",
        contractAddress: "0x87B2...1a9C",
        amount: "50,000 USDC",
        riskLevel: "low",
      },
    ],
    timelineEvents: [
      { id: "1", date: "Today", description: "Interacted with unknown contract", type: "danger" },
      { id: "2", date: "1 day ago", description: "Received suspicious airdrop token (USDT BONUS)", type: "warning" },
      { id: "3", date: "3 days ago", description: "Received suspicious token (FakeUSDC)", type: "warning" },
      { id: "4", date: "5 days ago", description: "Sent 0.5 ETH to flagged address", type: "danger" },
      { id: "5", date: "7 days ago", description: "Approved unlimited token spending for Unknown Contract", type: "danger" },
      { id: "6", date: "10 days ago", description: "Normal swap on Uniswap", type: "info" },
    ],
    aiExplanation:
      "This wallet shows moderate risk. Multiple suspicious airdrop tokens were detected, and there is an unlimited approval granted to an unverified contract. Additionally, interactions with a flagged address were found. We recommend revoking unnecessary approvals and avoiding interaction with suspicious tokens.",
  };
}
