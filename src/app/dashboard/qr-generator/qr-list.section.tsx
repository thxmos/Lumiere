"use client";

import { DashboardCard } from "@/components/dashboard-card";
import { QRCodeCard } from "./qr-list.card";
import { removeQRCodeStore, useQRCodeStore } from "@/stores/qr-codes";

export const QRListSection = () => {
  const qrCodes = useQRCodeStore((state) => state.qrCodes);

  const removeQRCode = (qrCodeId: string) => {
    removeQRCodeStore(qrCodeId);
  };

  return (
    <DashboardCard
      title="QR Codes"
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
