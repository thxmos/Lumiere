import { SessionUser } from "@/utils/lib/lucia";
import { prisma } from "@/utils/lib/prisma";
import { withAuth } from "@/utils/security/auth";

export const getAllProfileViewsByUserId = withAuth(
  async (user: SessionUser) => {
    const profileViews = await prisma.profileView.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    return profileViews;
  },
);
