"use server";

import { QRCodeDto } from "@/types/qr-codes";
import { toDtoMapper } from "@/repositories/qr-code/qr-code.repository";
import { prisma } from "@/utils/lib/prisma";

export async function updateQRCode(
  id: string,
  data: QRCodeDto,
): Promise<QRCodeDto> {
  const updatedQRCode = await prisma.qRCode.update({ where: { id }, data });
  return toDtoMapper(updatedQRCode);
}
