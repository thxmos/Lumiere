"use server";

import { ClickRepository } from "@/repositories/click/click.repository";
import { LinkRepository } from "@/repositories/link/link.repository";

export async function getLinksWithNumOfClicks(userId: string) {
  const linkRepository = new LinkRepository();
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
    const clickRepository = new ClickRepository();
    const clicks = await clickRepository.getAllByLinkId(link.id);
    link.clicks = clicks.length;
  }

  return linksWithClicks;
}
