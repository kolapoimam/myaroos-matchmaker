import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const links = [
  { to: "/marriage-readiness", label: "Readiness Quiz" },
  { to: "/compatibility", label: "Compatibility Test" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 transition-all duration-300",
        scrolled ? "border-b bg-background/75 shadow-sm backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between py-4">
        <Logo />

        <nav className="hidden items-center gap-1 rounded-full border bg-card/70 p-1 backdrop-blur md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost" className="rounded-full">
              <a href="https://paystack.com/pay/myaroos" target="_blank" rel="noopener noreferrer">
                <Heart className="mr-1.5 h-4 w-4 text-rose" fill="currentColor" />
                Donate
              </a>
            </Button>
            <Button asChild className="rounded-full px-5">
              <Link to="/marriage-readiness">Get Started</Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="mt-8 flex flex-col gap-2">
                <Logo className="mb-6" />
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "rounded-xl px-4 py-3 text-lg font-semibold transition-colors",
                        isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <Button asChild variant="outline" className="mt-6 rounded-full">
                  <a href="https://paystack.com/pay/myaroos" target="_blank" rel="noopener noreferrer">
                    <Heart className="mr-1.5 h-4 w-4 text-rose" fill="currentColor" />
                    Donate
                  </a>
                </Button>
                <Button asChild className="rounded-full">
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
