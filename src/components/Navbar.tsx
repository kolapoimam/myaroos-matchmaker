
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-10 transition-all duration-300 font-sans ${
        scrolled 
          ? "backdrop-blur-lg bg-background/70 border-b shadow-sm" 
          : "bg-background/90 border-b"
      }`}
    >
      <div className="container-custom py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-semibold text-xl">
            M
          </div>
          <span className="font-semibold text-xl">MyAroos</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
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
          
          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="outline">
              <a href="https://paystack.com/pay/myaroos" target="_blank" rel="noopener noreferrer">
                Donate
              </a>
            </Button>
            <Button asChild size="lg">
              <Link to="/marriage-readiness">Get Started</Link>
            </Button>
          </div>
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8 font-sans">
                <Link to="/marriage-readiness" className="text-lg font-medium hover:text-brand-green transition-colors">
                  Readiness Quiz
                </Link>
                <Link to="/compatibility" className="text-lg font-medium hover:text-brand-green transition-colors">
                  Compatibility Test
                </Link>
                <Link to="/about" className="text-lg font-medium hover:text-brand-green transition-colors">
                  About
                </Link>
                <Button asChild variant="outline" className="mt-4">
                  <a href="https://paystack.com/pay/myaroos" target="_blank" rel="noopener noreferrer">
                    Donate
                  </a>
                </Button>
                <Button asChild>
                  <Link to="/marriage-readiness">Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
