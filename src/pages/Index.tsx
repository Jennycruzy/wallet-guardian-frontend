import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Search, Wallet, Keyboard } from "lucide-react";
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="min-h-screen flex flex-col items-center justify-center px-4 gradient-glow-bg"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-lg w-full">
        {/* Verified badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="px-5 py-2 rounded-full border border-primary/30 bg-primary/10 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold tracking-widest text-primary uppercase font-mono">Verifiable AI Security</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-gradient-primary">WalletGuard</h1>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground text-center text-lg"
        >
          Paste any wallet address or <span className="font-semibold text-gradient-primary">connect your wallet</span> for a security analysis — powered by <a href="https://opengradient.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenGradient</a>'s verifiable AI.
        </motion.p>

        {/* How it works flow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="w-full grid grid-cols-4 gap-2"
        >
          {[
            { step: "01", title: "Paste", sub: "Enter address" },
            { step: "02", title: "Fetch", sub: "Chain lookup" },
            { step: "03", title: "Analyze", sub: "Threat scan" },
            { step: "04", title: "Report", sub: "Risk score" },
          ].map((item, i) => (
            <div
              key={item.step}
              className="relative flex flex-col items-center gap-1.5 p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_16px_hsl(175_80%_50%/0.15)] hover-scale transition-all duration-300 group"
            >
              <span className="text-[10px] font-mono text-primary font-bold">{item.step}</span>
              <span className="text-xs font-semibold text-foreground">{item.title}</span>
              <span className="text-[10px] text-muted-foreground">{item.sub}</span>
              {i < 3 && (
                <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-primary/40 text-xs hidden sm:block">→</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Input card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="w-full rounded-xl gradient-border-top card-gradient-border p-6 space-y-4"
        >
          {/* Mode toggle */}
          <div className="flex rounded-lg bg-secondary/80 border border-border p-1 gap-1">
            <button
              onClick={() => setMode("paste")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-semibold transition-all duration-200 ${
                mode === "paste"
                  ? "bg-primary/15 text-primary border border-primary/30 shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Keyboard className="w-3.5 h-3.5" />
              Paste Address
            </button>
            <button
              onClick={() => setMode("connect")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-semibold transition-all duration-200 ${
                mode === "connect"
                  ? "bg-primary/15 text-primary border border-primary/30 shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              Connect Wallet
            </button>
          </div>

          {mode === "paste" ? (
            <>
              <span className="text-xs font-bold tracking-widest text-foreground uppercase font-mono">Wallet Address</span>
              <div className="relative">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                  placeholder="0x3a1b2c3d4e5f..."
                  className="w-full px-4 py-3.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Try an example:{" "}
                <button
                  onClick={() => setAddress("0x9A1B2c3D4e5F6789abCDEF0123456789AbCdEf12")}
                  className="text-primary hover:underline font-mono"
                >
                  0x9A1B...Ef12
                </button>
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-4">
              {isConnected && connectedAddress ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/30">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-sm font-semibold text-success">Connected</span>
                  </div>
                  <code className="text-sm font-mono text-foreground bg-secondary px-4 py-2 rounded-lg border border-border">
                    {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
                  </code>
                  <button
                    onClick={() => disconnect()}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <>
                  <Wallet className="w-10 h-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground text-center">
                    Connect your wallet to automatically scan your address
                  </p>
                  <button
                    onClick={openConnectModal}
                    className="px-6 py-3 rounded-lg btn-gradient flex items-center gap-2 text-sm"
                  >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </button>
                </>
              )}
            </div>
          )}

          <button
            onClick={handleScan}
            disabled={!canScan}
            className="w-full py-3.5 rounded-lg btn-gradient flex items-center justify-center gap-2 text-base"
          >
            <Search className="w-4 h-4" />
            Analyze
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground"
        >
          {["Scam Tokens", "Clone Detection", "Approval Risks", "AI Analysis", "Timeline"].map((f) => (
            <span key={f} className="px-3 py-1 rounded-full bg-secondary border border-border">{f}</span>
          ))}
        </motion.div>

        {/* Powered by OpenGradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col items-center gap-3 pt-4"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <a
            href="https://opengradient.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-primary/15 bg-primary/5 hover:bg-primary/10 transition-all"
          >
            <span className="text-xs text-muted-foreground">Powered by</span>
            <span className="text-xs font-bold text-gradient-primary tracking-wide">OpenGradient</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </a>
          <p className="text-[10px] text-muted-foreground/60 text-center max-w-xs font-mono">
            Verifiable AI inference on the OpenGradient Network — decentralized, transparent, onchain.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
