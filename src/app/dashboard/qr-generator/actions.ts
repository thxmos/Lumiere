"use server";

import { createQRCode, getQRCodesByUserId } from "@/data-access/qr-codes";

export const createQRCodeAction = async (url: string, userId: string) => {
  const qrCode = await createQRCode({ url, userId });
  return qrCode;
};

export const getQRCodesByUserIdAction = async (userId: string) => {
  const qrCodes = await getQRCodesByUserId(userId);
  return qrCodes;
};
