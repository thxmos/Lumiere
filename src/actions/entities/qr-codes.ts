import { getUser } from "@/actions/entities/session";
import { CreateQRCodeDto } from "@/types/qr-codes";
import { prisma } from "@/utils/lib/prisma";
import { QRCode } from "@prisma/client";
import type { QRCodeDto } from "@/types/qr-codes";

function toDtoMapper(qrCode: QRCode): QRCodeDto {
  return {
    id: qrCode.id,
    url: qrCode.url,
    title: qrCode.title || "",
    userId: qrCode.userId,
    scans: qrCode.scans,
    createdAt: qrCode.createdAt,
    updatedAt: qrCode.updatedAt,
  };
}

export async function createQRCode(data: CreateQRCodeDto): Promise<QRCodeDto> {
  const userQrCodes = await getQRCodesByUserId(data.userId);
  if (userQrCodes.length < 10) {
    const createdQRCode = await prisma.qRCode.create({ data });
    return toDtoMapper(createdQRCode);
  } else {
    throw new Error("You have reached the maximum number of QR codes");
  }
}

export async function getQRCodeById(id: string): Promise<QRCodeDto> {
  const qrCode = await prisma.qRCode.findUnique({ where: { id } });
  if (!qrCode) throw new Error("QR code not found");
  return toDtoMapper(qrCode);
}

export async function getQRCodesByUserId(userId: string): Promise<QRCodeDto[]> {
  const qrCodes = await prisma.qRCode.findMany({ where: { userId } });
  return qrCodes.map(toDtoMapper);
}

export async function updateQRCode(
  id: string,
  data: QRCodeDto,
): Promise<QRCodeDto> {
  const updatedQRCode = await prisma.qRCode.update({ where: { id }, data });
  return toDtoMapper(updatedQRCode);
}

export async function deleteQRCode(id: string): Promise<void> {
  const { user } = await getUser();
  if (!user) {
    throw new Error("User not found");
  }
  await prisma.qRCode.delete({ where: { id, userId: user.id } });
}
