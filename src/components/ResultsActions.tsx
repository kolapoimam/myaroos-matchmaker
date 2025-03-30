
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, Copy, Facebook, Twitter, Linkedin, Whatsapp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ResultsActionsProps {
  title: string;
  subtitle: string;
  score: number;
  type: "readiness" | "compatibility";
  shareText: string;
}

const ResultsActions = ({ title, subtitle, score, type, shareText }: ResultsActionsProps) => {
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();

  const generateTimestamp = () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      formatted: `${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`
    };
  };

  const downloadAsImage = async () => {
    setDownloading(true);
    try {
      const resultsElement = document.getElementById("results-container");
      if (!resultsElement) {
        toast({
          title: "Error",
          description: "Could not find results to download",
          variant: "destructive",
        });
        return;
      }

      const canvas = await html2canvas(resultsElement, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true,
      });

      // Create a new canvas with additional branding
      const brandedCanvas = document.createElement("canvas");
      const ctx = brandedCanvas.getContext("2d");
      brandedCanvas.width = canvas.width;
      brandedCanvas.height = canvas.height + 80; // Additional space for branding
      
      if (ctx) {
        // Fill background with gradient
        const gradient = ctx.createLinearGradient(0, 0, brandedCanvas.width, brandedCanvas.height);
        gradient.addColorStop(0, "#f0fdf4");
        gradient.addColorStop(1, "#e0f2fe");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, brandedCanvas.width, brandedCanvas.height);
        
        // Draw the original canvas content
        ctx.drawImage(canvas, 0, 0);
        
        // Add branding at the bottom
        ctx.fillStyle = "#18181b";
        ctx.font = "bold 18px Poppins, sans-serif";
        ctx.fillText("MyAroos", 20, canvas.height + 35);
        
        // Add timestamp
        const { formatted } = generateTimestamp();
        ctx.font = "14px Poppins, sans-serif";
        ctx.fillText(formatted, 20, canvas.height + 60);
        
        // Add decorative elements
        ctx.fillStyle = "#10b981";
        ctx.fillRect(brandedCanvas.width - 80, canvas.height + 20, 60, 6);
        ctx.fillRect(brandedCanvas.width - 60, canvas.height + 40, 40, 6);
      }

      const link = document.createElement("a");
      link.download = `myaroos-${type}-results-${Date.now()}.png`;
      link.href = brandedCanvas.toDataURL("image/png");
      link.click();
      
      toast({
        title: "Download Complete",
        description: "Your results image has been downloaded",
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        description: "Could not generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  const downloadAsPdf = async () => {
    setDownloading(true);
    try {
      const resultsElement = document.getElementById("results-container");
      if (!resultsElement) {
        toast({
          title: "Error",
          description: "Could not find results to download",
          variant: "destructive",
        });
        return;
      }

      const canvas = await html2canvas(resultsElement, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
      });

      // Add gradient background
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Add gradient background (simulated with rectangles)
      for (let i = 0; i < pageHeight; i += 2) {
        const greenValue = 240 + (i / pageHeight) * 15;
        pdf.setFillColor(240, greenValue, 250);
        pdf.rect(0, i, pageWidth, 2, "F");
      }

      // Add a header
      pdf.setTextColor(16, 185, 129); // Brand green
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(24);
      pdf.text("MyAroos", 14, 15);
      
      // Add a subtitle
      pdf.setFontSize(12);
      pdf.setTextColor(107, 114, 128); // Gray
      pdf.text(`${type === "readiness" ? "Marriage Readiness" : "Compatibility"} Results`, 14, 22);
      
      // Add the image
      const imgWidth = pageWidth - 28; // Margins on both sides
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 14, 30, imgWidth, imgHeight);
      
      // Add timestamp at the bottom
      const { formatted } = generateTimestamp();
      pdf.setFontSize(10);
      pdf.setTextColor(107, 114, 128);
      pdf.text(`Generated on ${formatted}`, 14, pageHeight - 10);
      
      // Add decorative elements
      pdf.setFillColor(16, 185, 129);
      pdf.rect(pageWidth - 50, pageHeight - 15, 36, 3, "F");
      pdf.rect(pageWidth - 40, pageHeight - 10, 26, 3, "F");

      pdf.save(`myaroos-${type}-results-${Date.now()}.pdf`);
      
      toast({
        title: "Download Complete",
        description: "Your results PDF has been downloaded",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <div className="flex flex-wrap gap-2 justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Results
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2">
            <div className="grid gap-2">
              <Button variant="outline" disabled={downloading} onClick={downloadAsImage}>
                Download as Image
              </Button>
              <Button variant="outline" disabled={downloading} onClick={downloadAsPdf}>
                Download as PDF
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share Results
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share your results</DialogTitle>
              <DialogDescription>
                Share your {type === "readiness" ? "marriage readiness" : "compatibility"} results with others
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 border rounded-md mt-4">
              <p className="text-sm">{shareText}</p>
            </div>
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  navigator.clipboard.writeText(shareText);
                  toast({
                    title: "Copied",
                    description: "Text copied to clipboard",
                  });
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Text
              </Button>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`, '_blank')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank')}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white"
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank')}
              >
                <Whatsapp className="h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ResultsActions;
