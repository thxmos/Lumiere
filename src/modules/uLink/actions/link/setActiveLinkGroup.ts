"use server";

import { prisma } from "@/shared/core/db/prisma";
import { withAuth } from "@/shared/utils/security/auth";
import { SessionUser } from "@/shared/core/auth/lucia";

/*
 * setActiveLinkGroup
 *
 * Set all link groups for a user to inactive, then set the selected link group to active.
 * Called by the LinkGroupGrid component.
 */

export const setActiveLinkGroup = withAuth(
  async (user: SessionUser, linkGroupId: string) => {
    await prisma.$transaction(async (tx) => {
      await Promise.all([
        // Set all other link groups for this user to inactive
        tx.linkGroup.updateMany({
          where: {
            User: {
              some: {
                id: user.id,
              },
            },
            id: {
              not: linkGroupId,
            },
          },
          data: {
            active: false,
          },
        }),

        // Set the selected link group to active
        tx.linkGroup.update({
          where: {
            id: linkGroupId,
            User: {
              some: {
                id: user.id,
              },
            },
          },
          data: {
            active: true,
          },
        }),
      ]);
    });
  },
);
