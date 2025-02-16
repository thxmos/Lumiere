import { qrScanRepository } from "@/shared/core/db/repositories/qr-scan";
import { SessionUser } from "@/shared/core/auth/lucia";
import { withAuth } from "@/shared/utils/security/auth";

export const getScansByUserId = withAuth(async (user: SessionUser) => {
  const scans = await qrScanRepository.getAllByUserId(user.id);
  return scans;
});
