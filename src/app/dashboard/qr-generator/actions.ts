"use server";

import {
  createQRCode,
  deleteQRCode,
  getQRCodesByUserId,
} from "@/data-access/qr-codes";
import type { QRCodeDto } from "@/types/qr-codes";

export const createQRCodeAction = async (
  url: string,
  title: string,
  userId: string,
) => {
  const qrCode = await createQRCode({ url, title, userId });
  return qrCode;
};

export const getQRCodesByUserIdAction = async (
  userId: string,
): Promise<QRCodeDto[]> => {
  const qrCodes = await getQRCodesByUserId(userId);
  return qrCodes;
};

export const deleteQRCodeAction = async (qrCodeId: string) => {
  await deleteQRCode(qrCodeId);
};
