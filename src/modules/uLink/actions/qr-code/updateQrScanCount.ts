"use server";

import { BrowserData } from "@s-types/clicks";
import { createScan } from "@ulink/actions/qr-scan/createScan";
import { CreateScanDto } from "@ulink/actions/qr-scan/createScan";
import { getQRCodeById } from "@ulink/actions/qr-code/getQrCodeById";
import { updateQRCode } from "@ulink/actions/qr-code/updateQrCode";

export const updateQrScanCount = async (
  qrId: string,
  browserData: Partial<BrowserData>,
) => {
  const qrCode = await getQRCodeById(qrId);
  if (!qrCode) throw new Error("QR code not found");

  await updateQRCode(qrId, {
    scans: (qrCode.scans || 0) + 1,
  });

  await createScan({
    qrId,
    ...browserData,
  } as CreateScanDto);
};
