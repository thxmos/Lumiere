"use server";

import { prisma } from "@/utils/lib/prisma";
import { toDtoMapper } from "@/repositories/qr-code/qr-code.repository";
import { QRCodeDto } from "@/types/qr-codes";

export async function getQRCodeById(id: string): Promise<QRCodeDto> {
  const qrCode = await prisma.qRCode.findUnique({ where: { id } });
  if (!qrCode) throw new Error("QR code not found");
  return toDtoMapper(qrCode);
}
