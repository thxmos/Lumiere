"use server";

import { withAuth } from "@utils/security/auth";
import { SessionUser } from "@core/auth/lucia";
import { qrCodeRepository } from "@core/db/repositories/qr-code";

export const deleteQRCode = withAuth(async (user: SessionUser, id: string) => {
  const qrCode = await qrCodeRepository.delete(id);
  return qrCode;
});
