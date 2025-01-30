"use server";

import { clickRepository } from "@/repositories/click";
import { linkRepository } from "@/repositories/link";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const getLinksWithNumOfClicks = withAuth(
  async (user: SessionUser, userId: string) => {
    const links = await linkRepository.getLinksByUserId(userId);

    if (!links) return [];
    const linksWithClicks = links
      .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
      .map((link, index) => ({
        ...link,
        index: link.index !== null ? link.index : index,
        clicks: 0, // Initialize clicks to 0, will need to fetch separately
      }));

    // Fetch clicks for each link
    for (const link of linksWithClicks) {
      const clicks = await clickRepository.getAllByLinkId(link.id);
      link.clicks = clicks.length;
    }

    return linksWithClicks;
  },
);
