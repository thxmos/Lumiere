"use client";

import { DashboardCard } from "@/components/dashboard-card";
import { QRCodeCard } from "./qr-card";
import { QRCodeDto } from "@/data-access/qr-codes";
import { useState } from "react";

export const QRListSection = ({ qrCodes }: { qrCodes: QRCodeDto[] }) => {
  const [qrCodesList, setQrCodesList] = useState<QRCodeDto[]>(qrCodes);

  const removeQRCodeFromListById = (qrCodeId: string) => {
    setQrCodesList(qrCodesList.filter((qrCode) => qrCode.id !== qrCodeId));
  };

  return (
    <DashboardCard
      title="QR Codes"
      description={`List of QR codes you generated (${qrCodes.length}/10)`}
    >
      {qrCodesList.map((qrCode, index) => (
        <QRCodeCard
          key={qrCode.id}
          qrCode={qrCode}
          index={index}
          removeQRCodeFromListById={removeQRCodeFromListById}
        />
      ))}
    </DashboardCard>
  );
};
