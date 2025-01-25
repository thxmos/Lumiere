"use server";

import {
  createQRCode,
  deleteQRCode,
  getQRCodesByUserId,
  QRCodeDto,
} from "@/data-access/qr-codes";

export const createQRCodeAction = async (url: string, userId: string) => {
  const qrCode = await createQRCode({ url, userId });
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
