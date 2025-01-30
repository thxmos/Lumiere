"use server";

import { qrCodeRepository, QrCodeResponse } from "@/repositories/qr-code";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";

export const getQRCodesByUserId = withAuth(
  async (user: SessionUser): Promise<QrCodeResponse[]> => {
    const qrCodes = await qrCodeRepository.getAllByUserId(user.id);
    return qrCodes;
  },
);
