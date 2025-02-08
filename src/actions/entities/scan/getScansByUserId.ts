import { prisma } from "@/utils/lib/prisma";
import { withAuth } from "@/utils/security/auth";

export const getScansByUserId = withAuth(async () => {
  const scans = await prisma.scan.findMany({
    where: {
      userId: userId,
    },
  });
});
