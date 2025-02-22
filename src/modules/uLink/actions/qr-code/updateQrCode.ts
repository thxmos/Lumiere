"use server";

import { SessionUser } from "@core/auth/lucia";
import { withAuth } from "@utils/security/auth";
import {
  qrCodeRepository,
  QrCodeResponse,
  QrCodeUpdateInput,
} from "@core/db/repositories/qr-code";

export const updateQRCode = withAuth(
  async (
    user: SessionUser,
    id: string,
    data: QrCodeUpdateInput,
  ): Promise<QrCodeResponse> => {
    const updatedQRCode = await qrCodeRepository.update(id, data);
    return updatedQRCode;
  },
);
