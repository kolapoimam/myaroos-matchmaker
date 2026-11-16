import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Use light colours on dark surfaces (e.g. the footer) */
  inverted?: boolean;
}

/** Crescent + ring mark (same as public/favicon.svg) */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-9 w-9", className)} aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#0F5E4A" />
      <circle cx="28" cy="35" r="17" fill="#E2A93B" />
      <circle cx="35.5" cy="29.5" r="14.5" fill="#0F5E4A" />
      <circle cx="44" cy="22" r="6.2" fill="none" stroke="#E2A93B" strokeWidth="3.4" />
      <path d="M44 9.5l3.6 4.6H40.4z" fill="#F4E9D4" />
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
