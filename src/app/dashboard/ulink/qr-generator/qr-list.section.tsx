"use client";

import { DashboardCard } from "@/components/layouts/dashboard-card";
import { QRCodeCard } from "./components/qr-list.card";
import { useQRCodeStore } from "@/stores/old/qr-codes";
import { ScanQrCodeIcon } from "lucide-react";

export const QRListSection = () => {
  const { qrCodes, removeQRCode } = useQRCodeStore();

  return (
    <DashboardCard
      title={
        <div className="flex items-center gap-2">
          <ScanQrCodeIcon className="w-8 h-8" />
          QR Codes
        </div>
      }
      description={`List of QR codes you generated (${qrCodes.length}/10)`}
    >
      {qrCodes.map((qrCode, index) => (
        <QRCodeCard
          key={qrCode.id}
          qrCode={qrCode}
          index={index}
          removeQRCode={removeQRCode}
        />
      ))}
    </DashboardCard>
  );
};

// sort by createdAt
// .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
