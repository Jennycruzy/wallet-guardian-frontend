import { Users } from "lucide-react";
import type { CloneWallet } from "@/types/wallet";

interface CloneWalletListProps {
  walletAddress: string;
  clones: CloneWallet[];
}

export function CloneWalletList({ walletAddress, clones }: CloneWalletListProps) {
  const shortAddr = walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        Clone Impersonator Detection
      </h2>
      <div className="glass-card rounded-lg p-4 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs px-2 py-0.5 rounded bg-success/10 text-success font-medium">Your Wallet</span>
          <code className="font-mono text-sm text-foreground">{shortAddr}</code>
        </div>
        <div className="space-y-2">
          {clones.map((clone, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-md bg-secondary/50 border border-border">
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive font-medium">Clone</span>
                <code className="font-mono text-sm text-foreground">{clone.address}</code>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{clone.similarity}% match</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  clone.riskLevel === "high" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                }`}>
                  {clone.riskLevel}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Attackers create look-alike wallet addresses to trick users into sending funds to the wrong address.
        </p>
      </div>
    </div>
  );
}
