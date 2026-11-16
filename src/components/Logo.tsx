import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Use light colours on dark surfaces (e.g. the footer) */
  inverted?: boolean;
}

/** Engagement ring whose stone is an eight-point Islamic star. Same artwork as public/favicon.svg */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-9 w-9", className)} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#0F5E4A" />
      <circle cx="32" cy="40.5" r="14" fill="none" stroke="#E2A93B" strokeWidth="5.4" />
      <polygon points="32.00,7.50 35.34,10.93 40.13,10.87 40.07,15.66 43.50,19.00 40.07,22.34 40.13,27.13 35.34,27.07 32.00,30.50 28.66,27.07 23.87,27.13 23.93,22.34 20.50,19.00 23.93,15.66 23.87,10.87 28.66,10.93" fill="#FBF6EC" />
      <polygon points="32.00,14.60 33.28,15.91 35.11,15.89 35.09,17.72 36.40,19.00 35.09,20.28 35.11,22.11 33.28,22.09 32.00,23.40 30.72,22.09 28.89,22.11 28.91,20.28 27.60,19.00 28.91,17.72 28.89,15.89 30.72,15.91" fill="#E2A93B" />
    </svg>
  );
}

export default function Logo({ className, inverted }: LogoProps) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label="MyAroos home">
      <LogoMark className="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" />
      <span className={cn("font-display text-2xl font-semibold tracking-tight", inverted ? "text-white" : "text-foreground")}>
        My<span className={inverted ? "text-gold" : "text-primary"}>Aroos</span>
      </span>
    </Link>
  );
}
