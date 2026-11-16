import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import Logo from "./Logo";
import { REPO_URL } from "@/lib/constants";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 overflow-hidden bg-[hsl(165_35%_8%)] text-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gold"
      />
      <div className="container-custom grid gap-12 py-14 text-center md:grid-cols-[1.4fr_1fr_1.2fr] md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            A Muslim marriage readiness and compatibility tool to help you prepare for one of the most important decisions
            of your life. Free, private and open source.
          </p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-colors hover:border-gold hover:text-gold"
          >
            <Github className="h-4 w-4" />
            Contribute on GitHub
          </a>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-gold">Explore</h4>
          <ul className="space-y-3 text-white/75">
            <li>
              <Link to="/marriage-readiness" className="transition-colors hover:text-white">
                Marriage Readiness Quiz
              </Link>
            </li>
            <li>
              <Link to="/compatibility" className="transition-colors hover:text-white">
                Compatibility Test
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-white">
                About & FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-gold">Disclaimer</h4>
          <p className="text-sm leading-relaxed text-white/70">
            MyAroos is a guidance tool. Always consult Islamic scholars, family members and trusted advisors when making
            important life decisions like marriage.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col items-center justify-between gap-2 py-6 text-center text-sm text-white/55 md:flex-row md:text-left">
          <p>© {currentYear} MyAroos. Released under the MIT License.</p>
          <p>
            Built by{" "}
            <a
              href="https://kolapo.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/80 transition-colors hover:text-gold"
            >
              Kolapo Imam
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
