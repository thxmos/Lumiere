import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { generateQRCode } from "./utils";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDeleteModal } from "@/components/confirm-delete-modal";
import { useState } from "react";
import { deleteQRCodeAction } from "./actions";

export const QRCodeCard = ({
  qrCode,
  index,
  removeQRCodeFromListById,
}: {
  qrCode: any;
  index: number;
  removeQRCodeFromListById: (qrCodeId: string) => void;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    removeQRCodeFromListById(qrCode.id);

    try {
      await deleteQRCodeAction(qrCode.id);
      toast.success("QR code deleted successfully");
    } catch (error) {
      toast.error("Failed to delete QR code");
      console.error(error);
    }
  };

  return (
    <Card
      key={qrCode.id}
      className="flex flex-col gap-2 bg-background border-primary"
    >
      <div className="flex gap-16 p-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <Label className="text-lg font-bold text-primary">{index + 1}</Label>
          <div className="relative w-[100px] h-[100px] border border-primary">
            <Image
              src={generateQRCode(qrCode.url)}
              alt="Generated QR Code"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-primary">{qrCode.url}</h3>
            {/* <p className="text-sm text-muted-foreground">Clicks: 100</p> */}
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
  );
};
