import { DashboardCard } from "@/components/dashboard-card";
import { Card } from "@/components/ui/card";
import { deleteQRCodeAction, getQRCodesByUserIdAction } from "./actions";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "../links/components/confirm-delete-modal";
import { Label } from "@/components/ui/label";

export const QRCodeList = async ({ userId }: { userId: string }) => {
  const qrCodes = await getQRCodesByUserIdAction(userId);

  const generateQRCode = (link: string) => {
    const encodedLink = encodeURIComponent(link);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedLink}&size=200x200`;
    return qrCodeUrl;
  };

  const handleDeleteQRCode = async (qrCodeId: string) => {
    // await deleteQRCodeAction(qrCodeId);
  };

  return (
    <DashboardCard
      title="QR Codes"
      description={`List of QR codes you generated (${qrCodes.length}/10)`}
    >
      {qrCodes.map((qrCode, index) => (
        <Card
          key={qrCode.id}
          className="flex flex-col gap-2 bg-background border-primary"
        >
          <div className="flex gap-16 p-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <Label className="text-lg font-bold text-primary">
                {index + 1}
              </Label>
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
                <p className="text-sm text-muted-foreground">Clicks: 100</p>
              </div>
            </div>
            <div className="flex justify-end p-4">
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
                <span className="sr-only">Delete QR code</span>
              </Button>
            </div>
          </div>
          {/* <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
          /> */}
        </Card>
      ))}
    </DashboardCard>
  );
};
