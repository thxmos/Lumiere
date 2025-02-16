"use server";

import {
  qrCodeRepository,
  QrCodeResponse,
} from "@/shared/core/db/repositories/qr-code";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/shared/core/auth/lucia";

export const getQRCodesByUserId = withAuth(
  async (user: SessionUser): Promise<QrCodeResponse[]> => {
    try {
      const qrCodes = await qrCodeRepository.getAllByUserId(user.id);
      return qrCodes;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
);
