import { scanRepository } from "@/repositories/scan";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const getScansByUserId = withAuth(async (user: SessionUser) => {
  const scans = await scanRepository.getAllByUserId(user.id);
  return scans;
});
