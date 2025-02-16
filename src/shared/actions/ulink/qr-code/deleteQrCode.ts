"use server";

import { withAuth } from "@/shared/utils/security/auth";
import { SessionUser } from "@/shared/core/auth/lucia";
import { qrCodeRepository } from "@/shared/core/db/repositories/qr-code";

export const deleteQRCode = withAuth(async (user: SessionUser, id: string) => {
  const qrCode = await qrCodeRepository.delete(id);
  return qrCode;
});
