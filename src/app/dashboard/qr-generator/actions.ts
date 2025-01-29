"use server";

import {
  createQRCode,
  deleteQRCode,
  getQRCodesByUserId,
} from "@/actions/entities/qr-codes";
import type { QRCodeDto } from "@/types/qr-codes";

export const createQRCodeAction = async (
  url: string,
  title: string,
  userId: string,
): Promise<QRCodeDto> => {
  const qrCode = await createQRCode({ url, title, userId });
  return qrCode;
};

export const getQRCodesByUserIdAction = async (
  userId: string,
): Promise<QRCodeDto[]> => {
  const qrCodes = await getQRCodesByUserId(userId);
  return qrCodes;
};

export const deleteQRCodeAction = async (qrCodeId: string): Promise<void> => {
  await deleteQRCode(qrCodeId);
};
