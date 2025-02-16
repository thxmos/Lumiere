"use server";

import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/modules/shared/core/auth/lucia";
import { qrCodeRepository } from "@/modules/shared/core/db/repositories/qr-code";

export const deleteQRCode = withAuth(async (user: SessionUser, id: string) => {
  const qrCode = await qrCodeRepository.delete(id);
  return qrCode;
});
