import { DashboardCard } from "@/components/dashboard-card";
import { Card } from "@/components/ui/card";
import { deleteQRCodeAction, getQRCodesByUserIdAction } from "./actions";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "../links/components/confirm-delete-modal";

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
        <Card key={qrCode.id} className="flex flex-col gap-2 ">
          <div className="flex gap-16 p-4 items-center ">
            <h3>{index + 1}</h3>
            <div className="relative w-[100px] h-[100px] ">
              <Image
                src={generateQRCode(qrCode.url)}
                alt="Generated QR Code"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3>{qrCode.url}</h3>
              <p>Clicks: 100</p>
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
