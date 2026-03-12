import { FileCheck } from "lucide-react";
import type { Approval } from "@/types/wallet";

interface ApprovalListProps {
  approvals: Approval[];
}

export function ApprovalList({ approvals }: ApprovalListProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <FileCheck className="w-5 h-5 text-primary" />
        Contract Approvals
      </h2>
      <div className="glass-card rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-3 text-xs font-medium text-muted-foreground border-b border-border">
          <span>Contract</span>
          <span>Address</span>
          <span>Amount</span>
          <span className="text-right">Risk</span>
        </div>
        {approvals.map((approval, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 p-3 text-sm items-center border-b border-border last:border-0">
            <span className="font-medium text-foreground">{approval.contractName}</span>
            <code className="font-mono text-xs text-muted-foreground">{approval.contractAddress}</code>
            <span className={`text-sm ${approval.amount === "Unlimited" ? "text-warning font-medium" : "text-foreground"}`}>
              {approval.amount}
            </span>
            <div className="text-right">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                approval.riskLevel === "high"
                  ? "bg-destructive/10 text-destructive"
                  : approval.riskLevel === "medium"
                  ? "bg-warning/10 text-warning"
                  : "bg-success/10 text-success"
              }`}>
                {approval.riskLevel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
