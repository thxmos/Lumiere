"use server";

import { prisma } from "@/utils/lib/prisma";
import { QRCodeDto } from "@/types/qr-codes";
import { toDtoMapper } from "@/repositories/qr-code/qr-code.repository";

export async function getQRCodesByUserId(userId: string): Promise<QRCodeDto[]> {
  const qrCodes = await prisma.qRCode.findMany({ where: { userId } });
  return qrCodes.map(toDtoMapper);
}
