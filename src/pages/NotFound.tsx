import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import PageShell from "@/components/PageShell";
import { useSeo } from "@/hooks/useSeo";

const NotFound = () => {
  useSeo();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageShell>
      <section className="container-custom flex flex-col items-center py-24 text-center">
        <div className="text-7xl animate-wiggle" aria-hidden="true">
          🧭
        </div>
        <h1 className="mt-6 font-display text-7xl font-semibold">404</h1>
        <p className="mt-3 max-w-md text-lg text-muted-foreground">
          This page went missing like a sock in the washing machine. Let's get you back on the right path.
        </p>
        <Button asChild size="lg" className="mt-8 rounded-full">
          <Link to="/">Return to Home</Link>
        </Button>
      </section>
    </PageShell>
  );
};

export default NotFound;
