"use server";

import { QRCodeDto } from "@/types/qr-codes";
import { prisma } from "@/utils/lib/prisma";
import { getQRCodesByUserId } from "./getQrCodesByUserId";
import { CreateQRCodeDto } from "@/types/qr-codes";
import { toDtoMapper } from "@/repositories/qr-code/qr-code.repository";

export async function createQRCode(data: CreateQRCodeDto): Promise<QRCodeDto> {
  const userQrCodes = await getQRCodesByUserId(data.userId);
  if (userQrCodes.length < 10) {
    const createdQRCode = await prisma.qRCode.create({ data });
    return toDtoMapper(createdQRCode);
  } else {
    throw new Error("You have reached the maximum number of QR codes");
  }
}
