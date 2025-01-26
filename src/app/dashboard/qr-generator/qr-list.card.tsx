import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { generateQRCode } from "./utils";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDeleteModal } from "@/components/confirm-delete-modal";
import { useState } from "react";
import { deleteQRCodeAction } from "./actions";
import QRModal from "./qr-modal";
import type { QRCodeDto } from "@/types/qr-codes";

/*
TODO:
- click on card to open a big modal with the QR code
- add a button to download the QR code image
*/

export const QRCodeCard = ({
  qrCode,
  index,
  removeQRCodeFromListById,
}: {
  qrCode: QRCodeDto;
  index: number;
  removeQRCodeFromListById: (qrCodeId: string) => void;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleDelete = async () => {
    removeQRCodeFromListById(qrCode.id);

    try {
      await deleteQRCodeAction(qrCode.id);
      toast.success("QR code deleted successfully", { duration: 3000 });
    } catch (error) {
      toast.error("Failed to delete QR code", { duration: 3000 });
    }
  };

  const handleCardClick = () => {
    setIsQRModalOpen(true);
  };

  const handleQrSave = () => {};

  return (
    <>
      <Card
        key={qrCode.id}
        className="flex flex-col gap-2 bg-card border-secondary hover:border-primary transition-all"
      >
        <div className="flex gap-16 p-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <Label className="text-lg font-bold text-primary">
              {index + 1}
            </Label>
            <div
              className="relative w-[100px] h-[100px] border border-primary cursor-pointer"
              onClick={handleCardClick}
            >
              <Image
                src={generateQRCode(qrCode.url)}
                alt="Generated QR Code"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-primary">
                {qrCode.title || "Untitled"}
              </h3>
              <Link href={qrCode.url} target="_blank">
                <p className="text-md text-muted-foreground hover:text-primary hover:underline transition-all">
                  {qrCode.url}
                </p>
              </Link>
              <p className="text-sm text-muted-foreground">Scans: 0</p>
            </div>
          </div>
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Delete QR code</span>
            </Button>
          </div>
        </div>
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      </Card>
      <QRModal
        title={qrCode.url}
        qrCodeUrl={generateQRCode(qrCode.url)}
        linkUrl={qrCode.url}
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onConfirm={handleQrSave}
      />
    </>
  );
};
