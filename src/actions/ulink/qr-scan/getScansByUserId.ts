import { qrScanRepository } from "@/modules/shared/core/db/repositories/qr-scan";
import { SessionUser } from "@/modules/shared/core/auth/lucia";
import { withAuth } from "@/utils/security/auth";

export const getScansByUserId = withAuth(async (user: SessionUser) => {
  const scans = await qrScanRepository.getAllByUserId(user.id);
  return scans;
});
