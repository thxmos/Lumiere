"use server";

import { BrowserData } from "@/types/clicks";
import { createScan } from "../scan/createScan";
import { CreateScanDto } from "../scan/createScan";
import { getQRCodeById } from "./getQrCodeById";
import { updateQRCode } from "./updateQrCode";

export const updateQrScan = async (
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
