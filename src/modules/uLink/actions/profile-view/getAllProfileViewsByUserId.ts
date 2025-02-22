import { SessionUser } from "@core/auth/lucia";
import { prisma } from "@core/db/prisma";
import { withAuth } from "@utils/security/auth";

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
