
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container-custom py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-semibold text-xl">
            M
          </div>
          <span className="font-semibold text-xl">MyAroos</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-brand-green transition-colors">
            Home
          </Link>
          <Link to="/marriage-readiness" className="text-sm font-medium hover:text-brand-green transition-colors">
            Readiness Quiz
          </Link>
          <Link to="/compatibility" className="text-sm font-medium hover:text-brand-green transition-colors">
            Compatibility Test
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-brand-green transition-colors">
            About
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button asChild>
            <Link to="/marriage-readiness">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
