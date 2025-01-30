"use server";

import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";
import { qrCodeRepository } from "@/repositories/qr-code";

export const deleteQRCode = withAuth(async (user: SessionUser, id: string) => {
  const qrCode = await qrCodeRepository.delete(id);
  return qrCode;
});
