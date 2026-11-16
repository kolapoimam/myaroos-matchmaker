import { useEffect, useId, useState } from "react";
import { getScoreTone } from "@/lib/scoreTone";

interface ScoreRingProps {
  score: number;
  size?: number;
  /** Count up from zero on mount */
  animate?: boolean;
  caption?: string;
}

/** Circular progress ring with a gradient stroke and an animated count-up */
export default function ScoreRing({ score, size = 208, animate = true, caption }: ScoreRingProps) {
  const gradientId = useId();
  const [display, setDisplay] = useState(animate ? 0 : score);
  const tone = getScoreTone(score);

  useEffect(() => {
    if (!animate) {
      setDisplay(score);
      return;
    }
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(score);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * score));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score, animate]);

  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - display / 100);

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2FA77C" />
            <stop offset="60%" stopColor="#0F6B4F" />
            <stop offset="100%" stopColor="#D69E35" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl" aria-hidden="true">
          {tone.emoji}
        </span>
        <span className="font-display text-6xl font-semibold leading-none tabular-nums">
          {display}
          <span className="text-3xl text-muted-foreground">%</span>
        </span>
        <span className="mt-1 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: tone.color }}>
          {caption ?? tone.label}
        </span>
      </div>
    </div>
  );
}
