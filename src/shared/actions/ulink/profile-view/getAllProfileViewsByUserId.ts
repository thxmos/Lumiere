import { SessionUser } from "@/shared/core/auth/lucia";
import { prisma } from "@/shared/core/db/prisma";
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
