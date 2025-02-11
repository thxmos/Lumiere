import { qrScanRepository } from "@/repositories/qr-scan";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const getScansByUserId = withAuth(async (user: SessionUser) => {
  const scans = await qrScanRepository.getAllByUserId(user.id);
  return scans;
});
