import { AlertTriangle, Shield, ShieldAlert, ShieldCheck, Info } from "lucide-react";
import type { RiskSignal } from "@/types/wallet";

const severityConfig = {
  low: { icon: ShieldCheck, color: "text-success", bg: "bg-success/10", border: "border-success/20" },
  medium: { icon: Info, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  high: { icon: ShieldAlert, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
  critical: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/15", border: "border-destructive/30" },
};

interface RiskSignalCardsProps {
  signals: RiskSignal[];
}

export function RiskSignalCards({ signals }: RiskSignalCardsProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        AI Risk Signals
      </h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {signals.map((signal) => {
          const config = severityConfig[signal.severity];
          const Icon = config.icon;
          return (
            <div
              key={signal.id}
              className={`glass-card rounded-lg p-4 border ${config.border} space-y-2`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${config.color}`} />
                  <h3 className="font-medium text-sm text-foreground">{signal.title}</h3>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.bg} ${config.color}`}>
                  {signal.severity}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{signal.explanation}</p>
              <div className="pt-1 border-t border-border">
                <p className="text-xs text-primary font-medium">💡 {signal.action}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
