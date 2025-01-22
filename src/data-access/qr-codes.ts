import { prisma } from "@/utils/prisma";
import { QRCode } from "@prisma/client";

export type CreateQRCodeDto = {
  url: string;
  userId: string;
};

export type QRCodeDto = {
  id: string;
  url: string;
  userId: string;
};

function toDtoMapper(qrCode: QRCode): QRCodeDto {
  return {
    id: qrCode.id,
    url: qrCode.url,
    userId: qrCode.userId,
  };
}

export async function createQRCode(data: CreateQRCodeDto): Promise<QRCodeDto> {
  const createdQRCode = await prisma.qRCode.create({ data });
  return toDtoMapper(createdQRCode);
}

export async function getQRCodesByUserId(userId: string): Promise<QRCodeDto[]> {
  const qrCodes = await prisma.qRCode.findMany({ where: { userId } });
  return qrCodes.map(toDtoMapper);
}
