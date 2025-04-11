// @/components/ui/share-dialog.tsx
import { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "./button";
import {
  Dialog as ShadcnDialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";

interface ShareDialogProps {
  triggerText: string;
  title: string;
  description: string;
  onConfirm?: () => void; 
}

export const ShareDialog = ({
  triggerText,
  title,
  description,
  onConfirm,
}: ShareDialogProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "NomNomBoard",
          text: "Check out NomNomBoard - a meal tracker for busy bees!",
          url: shareUrl,
        });
        console.log("Successfully shared!");
        if (onConfirm) onConfirm(); 
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
        if (onConfirm) onConfirm(); 
      });
    }
  };

  return (
    <ShadcnDialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="py-2 px-4 text-sm font-poppins">
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="share-link" className="sr-only">
              Share Link
            </Label>
            <Input
              id="share-link"
              value={shareUrl}
              readOnly
              className="w-full"
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="px-3"
            onClick={() => {
              navigator.clipboard.writeText(shareUrl).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              });
            }}
          >
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="default" onClick={handleShare}>
            {copied ? "Copied!" : "Share"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </ShadcnDialog>
  );
};

export default ShareDialog;