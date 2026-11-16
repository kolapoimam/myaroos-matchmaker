import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuestionOption {
  value: string;
  label: string;
  score: number;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

interface QuestionCardProps {
  question: Question;
  number: number;
  value?: string;
  onChange: (value: string) => void;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

/** One question with tappable answer cards. Keyboard and screen reader friendly via Radix RadioGroup. */
export default function QuestionCard({ question, number, value, onChange }: QuestionCardProps) {
  const answered = value !== undefined;

  return (
    <fieldset
      className={cn(
        "rounded-2xl border bg-background/60 p-4 transition-all duration-300 md:p-5",
        answered && "border-primary/30 bg-[hsl(var(--mint)/0.35)]"
      )}
    >
      <legend className="sr-only">{question.question}</legend>
      <div className="mb-4 flex items-start gap-3">
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
            answered ? "border-primary bg-primary text-primary-foreground" : "border-foreground/20 text-foreground/60"
          )}
        >
          {answered ? <Check className="h-4 w-4 animate-pop" strokeWidth={3} /> : number}
        </span>
        <p className="pt-1 font-semibold leading-snug" aria-hidden="true">
          {question.question}
        </p>
      </div>

      <RadioGroup value={value} onValueChange={onChange} className="grid gap-2">
        {question.options.map((option, i) => {
          const id = `${question.id}-${option.value}`;
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className={cn(
                "group flex cursor-pointer items-center gap-3 rounded-xl border bg-card px-3 py-2.5 text-sm transition-all duration-200",
                "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
                "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
                selected && "border-primary bg-primary/[0.07] shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]"
              )}
            >
              <RadioGroupItem value={option.value} id={id} className="sr-only" />
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-colors",
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-secondary text-foreground/60 group-hover:border-primary/40"
                )}
              >
                {LETTERS[i]}
              </span>
              <span className={cn("leading-snug", selected && "font-semibold")}>{option.label}</span>
            </label>
          );
        })}
      </RadioGroup>
    </fieldset>
  );
}
