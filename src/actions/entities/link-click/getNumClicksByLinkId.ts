"use server";

import { clickRepository } from "@/modules/shared/core/db/repositories/click";
import { SessionUser } from "@/modules/shared/core/auth/lucia";
import { withAuth } from "@/utils/security/auth";

/* getNumOfClicksByLinkId()
 *
 * Simply gets the number of clicks for a given linkId
 * Used to display clicks on metrics page
 */

export const getNumOfClicksByLinkId = withAuth(
  async (user: SessionUser, linkId: string) => {
    const clicks = await clickRepository.getAllByLinkId(linkId);
    return clicks.length;
  },
);
