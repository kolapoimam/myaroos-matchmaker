import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/** Shared page frame: navbar, patterned background with soft glows, footer */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="islamic-pattern relative flex min-h-screen flex-col overflow-x-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--mint))] opacity-70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 -z-10 h-[22rem] w-[22rem] rounded-full bg-[hsl(var(--gold)/0.18)] blur-3xl"
      />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
