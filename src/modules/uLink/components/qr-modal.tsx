import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "@components/ui/dialog";
import { SquareArrowOutUpRight } from "lucide-react";

/*
 * TODO: Download button to allow users to download the QR code as an image
 */

export default function QRModal({
  title,
  description,
  qrCodeUrl,
  linkUrl,
  isOpen,
  onClose,
}: {
  title: string;
  description?: string;
  qrCodeUrl: string;
  linkUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-primary w-full flex items-center justify-center">
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-4">
          <Image
            src={qrCodeUrl}
            alt="Generated QR Code"
            width={400}
            height={400}
            className="object-contain border border-primary"
          />
          {linkUrl && (
            <Link
              href={linkUrl}
              target="_blank"
              className="underline text-foreground-muted hover:text-primary transition-all text-sm flex items-center gap-2"
            >
              <SquareArrowOutUpRight className="h-4 w-4" />
              {linkUrl}
            </Link>
          )}
        </div>
        <DialogFooter>
          {/* <Button onClick={onConfirm} className="flex items-center gap-2">
            <DownloadIcon className="h-4 w-4" />
            Save
          </Button> */}
          {/* <Button onClick={onClose}>Close</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
