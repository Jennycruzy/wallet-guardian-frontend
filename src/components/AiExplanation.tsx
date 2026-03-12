import { Bot, ExternalLink, ShieldCheck } from "lucide-react";

interface VerifiableProof {
  transactionHash: string;
  teeProvider: string;
  explorerUrl: string;
}

interface AiExplanationProps {
  explanation: string;
  proof?: VerifiableProof; // Added proof prop
}

export function AiExplanation({ explanation, proof }: AiExplanationProps) {
  return (
    <div className="glass-card rounded-lg p-5 border border-primary/20 bg-primary/5 relative overflow-hidden">
      {/* Background Decorative Shield */}
      <ShieldCheck className="absolute -right-4 -top-4 w-24 h-24 text-primary/5 -rotate-12" />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-sm text-foreground">Verifiable AI Analysis</h3>
        </div>
        
        {/* TEE Status Badge */}
        {proof && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
            <ShieldCheck className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">TEE Secured</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {explanation}
        </p>

        {proof && (
          <div className="pt-3 border-t border-primary/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-medium">TEE Provider</span>
              <span className="text-xs font-semibold text-foreground">{proof.teeProvider}</span>
            </div>
            
            <a
              href={proof.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-md transition-all border border-primary/20"
            >
              View Proof on Explorer
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}