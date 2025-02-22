"use server";

import { withAuth } from "@utils/security/auth";
import { SessionUser } from "@core/auth/lucia";
import { qrCodeRepository } from "@core/db/repositories/qr-code";
import { QrCodeResponse } from "@core/db/repositories/qr-code/types";

export const getQRCodeById = withAuth(
  async (user: SessionUser, id: string): Promise<QrCodeResponse> => {
    const qrCode = await qrCodeRepository.findById(id);
    if (!qrCode) throw new Error("QR code not found");
    return qrCode;
  },
);
