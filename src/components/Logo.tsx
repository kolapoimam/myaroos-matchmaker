import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Use light colours on dark surfaces (e.g. the footer) */
  inverted?: boolean;
}

/** Crescent + ring mark with the MyAroos wordmark */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="hsl(var(--primary))" />
      <path
        d="M24.5 10.5a10 10 0 1 0 5 16.5 8 8 0 1 1-5-16.5z"
        fill="hsl(var(--gold))"
      />
      <circle cx="26.5" cy="14" r="2.2" fill="none" stroke="hsl(var(--gold))" strokeWidth="1.6" />
      <path d="M26.5 10.6l.8 1.2h-1.6z" fill="hsl(var(--gold))" />
    </svg>
  );
}

export default function Logo({ className, inverted }: LogoProps) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label="MyAroos home">
      <LogoMark className="transition-transform duration-500 group-hover:rotate-[20deg]" />
      <span className="flex items-baseline gap-1.5">
        <span className={cn("font-display text-2xl font-semibold", inverted ? "text-white" : "text-foreground")}>
          MyAroos
        </span>
        <span className="font-arabic text-base text-gold" lang="ar">
          عروس
        </span>
      </span>
    </Link>
  );
}
