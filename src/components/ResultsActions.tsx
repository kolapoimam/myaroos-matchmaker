import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, FileDown, ImageDown, Loader2, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ReportCard, { ReportData } from "./ReportCard";
import { downloadReportPdf, downloadReportPng } from "@/lib/exportReport";

export interface ResultsActionsProps {
  /** Everything the downloadable report needs */
  report: ReportData;
  /** Text used when sharing to social apps */
  shareText: string;
}

const shareTargets = [
  {
    name: "WhatsApp",
    color: "#25D366",
    href: (text: string) => `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
  },
  {
    name: "X",
    color: "#0F1419",
    href: (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
  },
  {
    name: "Facebook",
    color: "#1877F2",
    href: (text: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(text)}`,
  },
  {
    name: "LinkedIn",
    color: "#0A66C2",
    href: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`,
  },
];

export default function ResultsActions({ report, shareText }: ResultsActionsProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<"png" | "pdf" | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const run = async (kind: "png" | "pdf") => {
    if (!reportRef.current || busy) return;
    setBusy(kind);
    try {
      if (kind === "png") await downloadReportPng(reportRef.current, report.heading);
      else await downloadReportPdf(reportRef.current, report.heading);
      toast({ title: "Report downloaded", description: `Your ${kind.toUpperCase()} is ready. Barakallahu feek!` });
    } catch (error) {
      console.error(`Error generating ${kind}:`, error);
      toast({
        title: "Download failed",
        description: "Something went wrong while creating your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBusy(null);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button onClick={() => run("png")} disabled={!!busy} size="lg" className="rounded-full">
          {busy === "png" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageDown className="mr-2 h-4 w-4" />}
          Download PNG
        </Button>
        <Button onClick={() => run("pdf")} disabled={!!busy} size="lg" variant="outline" className="rounded-full">
          {busy === "pdf" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileDown className="mr-2 h-4 w-4" />}
          Download PDF
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" variant="ghost" className="rounded-full">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Share your results</DialogTitle>
              <DialogDescription>Spread the khair. Share on social media or copy the text.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-muted p-4 text-sm leading-relaxed">{shareText}</div>
              <div className="grid grid-cols-2 gap-2">
                {shareTargets.map((target) => (
                  <Button
                    key={target.name}
                    className="rounded-full text-white hover:opacity-90"
                    style={{ backgroundColor: target.color }}
                    onClick={() => window.open(target.href(shareText), "_blank", "noopener,noreferrer")}
                  >
                    {target.name}
                  </Button>
                ))}
              </div>
              <Button variant="outline" onClick={copyToClipboard} className="rounded-full">
                {isCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {isCopied ? "Copied!" : "Copy text"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Off-screen, fixed-layout copy of the results used for PNG/PDF export */}
      <div aria-hidden="true" style={{ position: "fixed", left: -10000, top: 0, pointerEvents: "none" }}>
        <ReportCard ref={reportRef} data={report} />
      </div>
    </>
  );
}
