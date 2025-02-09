"use server";

import { prisma } from "@/utils/lib/prisma";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";

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
            user: { id: user.id },
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
            user: { id: user.id },
          },
          data: {
            active: true,
          },
        }),
      ]);
    });
  },
);
