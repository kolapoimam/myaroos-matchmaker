
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, Copy, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Updated interface to support both legacy description and newer subtitle
export interface ResultsActionsProps {
  title: string;
  subtitle?: string;
  description?: string;
  score: number;
  type?: string;
  shareText?: string;
  maxScore?: number;
  resultsRef?: React.RefObject<HTMLDivElement>;
}

export default function ResultsActions({ 
  resultsRef,
  title, 
  subtitle,
  description, 
  score, 
  type,
  shareText,
  maxScore 
}: ResultsActionsProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Use either subtitle or description (for backward compatibility)
  const displayDescription = subtitle || description;

  // Get share text
  const getShareText = () => {
    if (shareText) return shareText;
    
    const scoreText = score !== undefined && maxScore !== undefined
      ? `${score}/${maxScore} (${Math.round((Number(score) / Number(maxScore)) * 100)}%)`
      : score !== undefined ? `${score}%` : '';
      
    return `${title}\n${displayDescription || ''}\n${scoreText}\n\nGenerated with MyAroos - Islamic Marriage Readiness & Compatibility Tool`;
  };
  
  // Copy text to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(getShareText()).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Download functions
  const downloadAsImage = async () => {
    const targetElement = resultsRef?.current || document.getElementById('results-container');
    if (!targetElement) return;
    
    try {
      const canvas = await html2canvas(targetElement, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      
      const date = new Date().toLocaleString();
      const dataUrl = canvas.toDataURL("image/png");
      
      const link = document.createElement("a");
      link.download = `MyAroos-${title.replace(/\s+/g, "-")}-${date}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const downloadAsPdf = async () => {
    const targetElement = resultsRef?.current || document.getElementById('results-container');
    if (!targetElement) return;
    
    try {
      const canvas = await html2canvas(targetElement, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      
      const date = new Date().toLocaleString();
      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add metadata and styling to PDF
      pdf.setFillColor(235, 247, 242); // Light green background
      pdf.rect(0, 0, 210, 297, "F");
      
      // Add brand header
      pdf.setFontSize(24);
      pdf.setTextColor(39, 174, 96); // Brand green
      pdf.text("MyAroos", 105, 20, { align: "center" });
      
      // Add date/time
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated on: ${date}`, 105, 30, { align: "center" });
      
      // Add the results image
      pdf.addImage(imgData, "PNG", 0, 40, imgWidth, imgHeight);
      
      // Add footer
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text("www.myaroos.com", 105, 290, { align: "center" });
      
      pdf.save(`MyAroos-${title.replace(/\s+/g, "-")}-${date}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4 justify-center font-poppins">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={downloadAsImage}>
            As Image (.png)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={downloadAsPdf}>
            As PDF (.pdf)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsShareDialogOpen(true)}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md font-poppins">
          <DialogHeader>
            <DialogTitle>Share your results</DialogTitle>
            <DialogDescription>
              Share your results on social media or copy the text.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm">{getShareText()}</p>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={copyToClipboard}
                className={isCopied ? "bg-green-100 text-green-800" : ""}
              >
                <Copy className="h-4 w-4 mr-2" />
                {isCopied ? "Copied!" : "Copy Text"}
              </Button>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-[#1877F2] hover:bg-[#1877F2]/90 text-white"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodeURIComponent(getShareText())}`, '_blank')}
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}`, '_blank')}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-[#0077B5] hover:bg-[#0077B5]/90 text-white"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(displayDescription || '')}`, '_blank')}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                  onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(getShareText())}`, '_blank')}
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
