"use client";

import { DashboardCard } from "@/components/dashboard-card";
import { QRCodeCard } from "./components/qr-list.card";
import { useQRCodeStore } from "@/stores/qr-codes";

export const QRListSection = () => {
  const { qrCodes, removeQRCode } = useQRCodeStore();

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

// sort by createdAt
// .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
