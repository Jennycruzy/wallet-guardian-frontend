import React from 'react';
import { Loader2, ShieldCheck, Cpu, Search } from 'lucide-react';

interface AISecurityScannerProps {
  isScanning: boolean;
  step: 'fetching' | 'ai-inference' | 'verifying' | 'idle';
}

const AISecurityScanner = ({ isScanning, step }: AISecurityScannerProps) => {
  if (!isScanning) return null;

  const getStepConfig = () => {
    switch (step) {
      case 'fetching':
        return { 
          icon: <Search className="animate-pulse" />, 
          text: "Fetching On-Chain Data", 
          sub: "Scanning Ethereum for approvals and scam signals..." 
        };
      case 'ai-inference':
        return { 
          icon: <Cpu className="animate-spin" />, 
          text: "Verifiable AI Analysis", 
          sub: "Gemini is inspecting wallet behavior inside a Secure Enclave..." 
        };
      case 'verifying':
        return { 
          icon: <ShieldCheck className="text-green-500 animate-bounce" />, 
          text: "Finalizing TEE Proof", 
          sub: "Generating cryptographic proof on OpenGradient..." 
        };
      default:
        return { 
          icon: <Loader2 className="animate-spin" />, 
          text: "Initializing Scanner", 
          sub: "Establishing secure connection to AI node..." 
        };
    }
  };

  const { icon, text, sub } = getStepConfig();

  return (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-primary/20 rounded-2xl bg-primary/5 backdrop-blur-sm max-w-md mx-auto">
      {/* Icon Container */}
      <div className="p-5 bg-background rounded-full shadow-lg mb-6 text-primary border border-primary/10">
        {React.cloneElement(icon as React.ReactElement, { size: 40 })}
      </div>

      {/* Text Content */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-foreground tracking-tight">{text}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {sub}
        </p>
      </div>
      
      {/* Visual Progress Bar */}
      <div className="w-full bg-secondary h-2 rounded-full mt-8 overflow-hidden">
        <div 
          className="bg-primary h-full transition-all duration-700 ease-in-out" 
          style={{ 
            width: step === 'fetching' ? '30%' : step === 'ai-inference' ? '70%' : '95%',
            boxShadow: '0 0 10px rgba(var(--primary), 0.5)'
          }} 
        />
      </div>

      <p className="text-[10px] uppercase font-bold text-primary/40 mt-6 tracking-widest">
        Powered by OpenGradient TEE
      </p>
    </div>
  );
};

export default AISecurityScanner;