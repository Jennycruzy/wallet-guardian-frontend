import { useEffect, useRef } from "react";

interface RiskScoreMeterProps {
  score: number;
  riskLevel: string;
}

const getRiskColor = (score: number) => {
  if (score >= 80) return { stroke: "hsl(0, 72%, 55%)", label: "Critical Risk" };
  if (score >= 60) return { stroke: "hsl(38, 92%, 55%)", label: "Moderate Risk" };
  if (score >= 40) return { stroke: "hsl(45, 90%, 55%)", label: "Low Risk" };
  return { stroke: "hsl(145, 65%, 45%)", label: "Safe" };
};

export function RiskScoreMeter({ score, riskLevel }: RiskScoreMeterProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const { stroke, label } = getRiskColor(score);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = String(circumference);
      requestAnimationFrame(() => {
        if (circleRef.current) {
          circleRef.current.style.transition = "stroke-dashoffset 1.5s ease-out";
          circleRef.current.style.strokeDashoffset = String(offset);
        }
      });
    }
  }, [score, circumference, offset]);

  return (
    <div className="glass-card rounded-lg p-6 flex flex-col items-center gap-4">
      <h2 className="text-lg font-semibold text-foreground">Wallet Risk Score</h2>
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="8"
          />
          <circle
            ref={circleRef}
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{ filter: `drop-shadow(0 0 8px ${stroke})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{score}</span>
          <span className="text-sm text-muted-foreground">/ 100</span>
        </div>
      </div>
      <span
        className="px-3 py-1 rounded-full text-sm font-medium"
        style={{ backgroundColor: `${stroke}20`, color: stroke }}
      >
        {riskLevel || label}
      </span>
    </div>
  );
}
