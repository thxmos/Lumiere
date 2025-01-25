import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { DownloadIcon } from "lucide-react";

/*
TODO:
Allow users to download the QR code as an image
*/

export default function QRModal({
  title,
  description,
  qrCodeUrl,
  isOpen,
  onClose,
  onConfirm,
}: {
  title: string;
  description?: string;
  qrCodeUrl: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-primary">
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <Image
            src={qrCodeUrl}
            alt="Generated QR Code"
            width={400}
            height={400}
          />
        </div>
        <DialogFooter>
          {/* <Button onClick={onConfirm} className="flex items-center gap-2">
            <DownloadIcon className="h-4 w-4" />
            Save
          </Button> */}
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
