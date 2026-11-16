import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  label: string;
  emoji: string;
}

interface StepperProps {
  steps: Step[];
  current: number;
  /** Called when a completed step is clicked. Omit to make steps read-only. */
  onSelect?: (index: number) => void;
}

/** Horizontal progress stepper with emoji badges and a filling track */
export default function Stepper({ steps, current, onSelect }: StepperProps) {
  const progress = steps.length > 1 ? (current / (steps.length - 1)) * 100 : 100;

  return (
    <div className="relative">
      <div className="absolute left-6 right-6 top-6 h-1 rounded-full bg-muted" aria-hidden="true">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-green-light via-primary to-gold transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <ol className="relative flex justify-between">
        {steps.map((step, index) => {
          const done = index < current;
          const active = index === current;
          const clickable = !!onSelect && done;
          return (
            <li key={step.id} className="flex w-16 flex-col items-center text-center sm:w-24">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onSelect?.(index)}
                aria-current={active ? "step" : undefined}
                aria-label={`${step.label}${done ? " (completed)" : ""}`}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl border-2 text-xl transition-all duration-300",
                  done && "border-primary bg-primary text-primary-foreground",
                  active && "scale-110 border-foreground bg-card shadow-[3px_3px_0_hsl(var(--foreground))]",
                  !done && !active && "border-border bg-card opacity-70",
                  clickable && "cursor-pointer hover:-translate-y-0.5"
                )}
              >
                {done ? <Check className="h-5 w-5" strokeWidth={3} /> : <span aria-hidden="true">{step.emoji}</span>}
              </button>
              <span
                className={cn(
                  "mt-2 text-[11px] font-semibold leading-tight sm:text-xs",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
