import { AlertTriangle } from "lucide-react";
import type { ScamToken } from "@/types/wallet";

const riskColors = {
  low: "border-success/20 text-success",
  medium: "border-warning/20 text-warning",
  high: "border-destructive/20 text-destructive",
};

interface ScamTokenListProps {
  tokens: ScamToken[];
}

export function ScamTokenList({ tokens }: ScamTokenListProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-warning" />
        Scam Token Detection
      </h2>
      <div className="space-y-3">
        {tokens.map((token, i) => (
          <div key={i} className={`glass-card rounded-lg p-4 border ${riskColors[token.riskLevel].split(" ")[0]}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-warning text-lg">⚠</span>
                <span className="font-medium text-sm text-foreground">Suspicious Token</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium bg-destructive/10 ${riskColors[token.riskLevel].split(" ")[1]}`}>
                {token.riskLevel}
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">
                <span className="text-foreground font-medium">Token:</span> {token.name} ({token.symbol})
              </p>
              <p className="text-muted-foreground text-xs mt-2">{token.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
