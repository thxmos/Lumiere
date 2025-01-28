"use server";

import { getQRCodeById } from "@/data-access/qr-codes";
import { updateQRCode } from "@/data-access/qr-codes";

export const updateQrScanAction = async (qrId: string) => {
  const qrCode = await getQRCodeById(qrId);
  if (!qrCode) throw new Error("QR code not found");
  qrCode.scans = (qrCode.scans || 0) + 1;
  await updateQRCode(qrId, qrCode);
  //   await createScan(qrId);
};
