"use server";

import { linkRepository } from "@/repositories/link";
import { LinkCreateInput, LinkUpdateInput } from "@/repositories/link/types";

import { LinkResponse } from "@/repositories/link/types";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const updateUserLinksAction = withAuth(
  async (user: SessionUser, links: Partial<LinkResponse>[]) => {
    if (!links) return;
    if (links.length > 10) return;

    const createLinksFiltered = links
      ?.filter((link) => link.id?.includes("new-"))
      .map((link, index) => ({
        index,
        id: link.id?.slice(4) || "",
        title: link.title,
        url: link.url,
        imageUrl: link.imageUrl,
        active: link.active,
      })) as LinkCreateInput[];

    await linkRepository.createMany(user, createLinksFiltered);

    const updateLinksFiltered = links
      ?.filter((link) => !link.id?.includes("new-"))
      .map((link) => ({
        index: link.index,
        id: link.id,
        title: link.title,
        url: link.url,
        imageUrl: link.imageUrl,
        active: link.active,
      })) as LinkUpdateInput[];

    await linkRepository.updateMany(user, updateLinksFiltered);

    // Return the updated links for client components to update store
    const result = links.map((link, index) => ({
      id: link.id?.includes("new-") ? link.id?.slice(4) : link.id,
      title: link.title,
      url: link.url,
      imageUrl: link.imageUrl,
      userId: user.id,
      active: link.active,
      index,
      clicks: link.clicks || 0,
    })) as LinkResponse[];
    return result;
  },
);
