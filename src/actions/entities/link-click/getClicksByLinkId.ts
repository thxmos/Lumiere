"use server";

import { clickRepository } from "@/repositories/click";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

/* getClicksByLinkId()
 *
 * Gets all clicks for a given linkId with full detail
 * Used to display more in depth analytics on metrics page
 */

export const getClicksByLinkId = withAuth(
  async (user: SessionUser, linkId: string) => {
    try {
      const clicks = await clickRepository.getAllByLinkId(linkId);
      return clicks;
    } catch (error) {
      console.error("Error getting clicks by linkId", error);
      return [];
    }
  },
);
