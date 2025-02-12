"use server";

import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";
import {
  qrCodeRepository,
  QrCodeResponse,
  QrCodeUpdateInput,
} from "@/repositories/qr-code";

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
