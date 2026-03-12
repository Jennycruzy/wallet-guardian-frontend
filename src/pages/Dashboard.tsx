import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { scanWallet } from "@/services/walletApi";
import type { ScanResult } from "@/types/wallet";

// Components
import { RiskScoreMeter } from "@/components/RiskScoreMeter";
import { RiskSignalCards } from "@/components/RiskSignalCards";
import { ScamTokenList } from "@/components/ScamTokenList";
import { CloneWalletList } from "@/components/CloneWalletList";
import { ApprovalList } from "@/components/ApprovalList";
import { SafetyTimeline } from "@/components/SafetyTimeline";
import { AiExplanation } from "@/components/AiExplanation";
import AISecurityScanner from "@/components/AISecurityScanner";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const wallet = searchParams.get("wallet") || "";
  
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // NEW: Error state added
  
  const [scanStep, setScanStep] = useState<'fetching' | 'ai-inference' | 'verifying' | 'idle'>('idle');

  useEffect(() => {
    if (!wallet) {
      navigate("/");
      return;
    }

    const performScan = async () => {
      setLoading(true);
      setError(null); // Reset error state on new scan
      setScanStep('fetching');
      
      try {
        const data = await scanWallet(wallet);
        
        setScanStep('ai-inference');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setScanStep('verifying');
        await new Promise(resolve => setTimeout(resolve, 600));
        
        setResult(data);
      } catch (err: any) {
        console.error("Scan failed:", err);
        // FIX: Trap the error and set it to state instead of navigating away
        setError(err.message || "Failed to connect to the AI Security Node.");
      } finally {
        setLoading(false);
        setScanStep('idle');
      }
    };

    performScan();
  }, [wallet, navigate]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <AISecurityScanner isScanning={loading} step={scanStep} />
      </div>
    );
  }

  // NEW: Error UI State
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center gap-4 bg-background">
        <div className="p-4 bg-red-500/10 rounded-full border border-red-500/20">
          <Shield className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Connection Error</h2>
        <p className="text-muted-foreground font-mono bg-secondary p-3 rounded-lg text-sm max-w-lg break-words border border-border">
          {error}
        </p>
        <button 
          onClick={() => navigate("/")} 
          className="text-primary hover:text-primary/80 transition-colors mt-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  if (!result) return null;

  const shortAddr = wallet.slice(0, 6) + "..." + wallet.slice(-4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="border-b border-border sticky top-0 z-50 bg-background/80 backdrop-blur-lg"
      >
        <div className="container max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg text-gradient-primary">WalletGuard</span>
          </div>
          <div className="flex items-center gap-3">
            <code className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded border border-border">
              {shortAddr}
            </code>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              New Scan
            </button>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid gap-6 md:grid-cols-[280px_1fr]"
        >
          <RiskScoreMeter score={result.walletRiskScore} riskLevel={result.riskLevel} />
          <AiExplanation 
            explanation={result.aiExplanation} 
            proof={result.verifiableProof} 
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <RiskSignalCards signals={result.riskSignals} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-2"
        >
          <ScamTokenList tokens={result.scamTokens} />
          <CloneWalletList walletAddress={wallet} clones={result.cloneWallets} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <ApprovalList approvals={result.approvals} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <SafetyTimeline events={result.timelineEvents} />
        </motion.div>

        {/* Powered by OpenGradient footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex items-center justify-center gap-3 py-8"
        >
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-primary/20" />
          <a
            href="https://opengradient.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/15 bg-primary/5 hover:bg-primary/10 transition-all"
          >
            <span className="text-xs text-muted-foreground">Verifiable AI by</span>
            <span className="text-xs font-bold text-gradient-primary">OpenGradient</span>
          </a>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-primary/20" />
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Dashboard;