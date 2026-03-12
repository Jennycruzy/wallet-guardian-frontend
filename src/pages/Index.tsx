import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Search, Wallet, Keyboard, ArrowRight } from "lucide-react"; // Added ArrowRight
import { motion } from "framer-motion";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const Index = () => {
  const [address, setAddress] = useState("");
  const [mode, setMode] = useState<"paste" | "connect">("paste");
  const navigate = useNavigate();
  const { address: connectedAddress, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const handleScan = () => {
    const target = mode === "connect" && connectedAddress ? connectedAddress : address.trim();
    if (target) {
      navigate(`/dashboard?wallet=${encodeURIComponent(target)}`);
    }
  };

  const canScan = mode === "connect" ? isConnected : !!address.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center gap-12" // Removed screen-centering, added gap
    >
      {/* 1. Brand Section */}
      <div className="flex flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase font-mono">
            Verifiable AI Security
          </span>
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <Shield className="w-12 h-12 text-primary drop-shadow-[0_0_15px_rgba(175,255,230,0.3)]" />
            <h1 className="text-5xl font-black tracking-tight text-gradient-primary">
              WalletGuard
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
            Analyze risks with <span className="text-foreground font-semibold">OpenGradient's</span> TEE-verified AI. 
            Connect or paste to start a deep-scan.
          </p>
        </div>
      </div>

      {/* 2. Process Flow (Visual Spacing Improved) */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
        {[
          { step: "01", title: "Paste", sub: "Wallet" },
          { step: "02", title: "Fetch", sub: "Data" },
          { step: "03", title: "Analyze", sub: "AI Scan" },
          { step: "04", title: "Report", sub: "Proof" },
        ].map((item, i) => (
          <div key={item.step} className="glass-card p-4 flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
            <span className="text-[10px] font-bold text-primary/50 mb-1 font-mono">{item.step}</span>
            <span className="text-sm font-bold text-foreground">{item.title}</span>
            <span className="text-[10px] text-muted-foreground">{item.sub}</span>
          </div>
        ))}
      </div>

      {/* 3. Main Input Card */}
      <div className="w-full max-w-xl glass-card p-8 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        
        <div className="flex rounded-xl bg-secondary/50 p-1.5 border border-border/50">
          <button
            onClick={() => setMode("paste")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
              mode === "paste" ? "bg-background text-primary shadow-xl" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Keyboard className="w-4 h-4" /> Paste Address
          </button>
          <button
            onClick={() => setMode("connect")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
              mode === "connect" ? "bg-background text-primary shadow-xl" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Wallet className="w-4 h-4" /> Connect Wallet
          </button>
        </div>

        {mode === "paste" ? (
          <div className="space-y-4">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Target Address</label>
              <button 
                onClick={() => setAddress("0x9A1B2c3D4e5F6789abCDEF0123456789AbCdEf12")}
                className="text-[10px] text-primary hover:underline font-bold"
              >
                Use Example
              </button>
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              className="w-full bg-background/50 border border-border px-4 py-4 rounded-xl font-mono text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center py-6 gap-4">
            {isConnected ? (
              <div className="flex flex-col items-center gap-2">
                <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-sm">
                  {connectedAddress?.slice(0, 6)}...{connectedAddress?.slice(-4)}
                </div>
                <button onClick={() => disconnect()} className="text-[10px] text-muted-foreground hover:text-destructive underline uppercase font-bold tracking-tighter">Disconnect</button>
              </div>
            ) : (
              <button onClick={openConnectModal} className="btn-analyze w-full">Connect Wallet</button>
            )}
          </div>
        )}

        <button
          onClick={handleScan}
          disabled={!canScan}
          className="btn-analyze w-full flex items-center justify-center gap-3 group"
        >
          <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Analyze Security
        </button>
      </div>

      {/* 4. Feature Pills */}
      <div className="flex flex-wrap justify-center gap-2 max-w-md opacity-60">
        {["Scam Detection", "TEE Proofs", "Approvals", "Risk Score"].map((f) => (
          <span key={f} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-border bg-secondary/30">
            {f}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default Index;