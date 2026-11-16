import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/** Shared page frame: navbar, patterned background with soft glows, footer */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="islamic-pattern relative flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
