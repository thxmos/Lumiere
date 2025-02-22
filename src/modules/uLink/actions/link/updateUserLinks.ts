"use server";

import { linkRepository } from "@core/db/repositories/link";
import {
  LinkCreateManyInput,
  LinkUpdateInput,
} from "@core/db/repositories/link/types";

import { LinkResponse } from "@core/db/repositories/link/types";
import { SessionUser } from "@core/auth/lucia";
import { withAuth } from "@utils/security/auth";

export const updateUserLinksAction = withAuth(
  async (
    user: SessionUser,
    links: Partial<LinkResponse>[],
    linkGroupId: string,
  ) => {
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
        imageId: link.imageId,
        active: link.active,
        linkGroupId,
      })) as LinkCreateManyInput[];

    await linkRepository.createMany(user, createLinksFiltered);

    const updateLinksFiltered = links
      ?.filter((link) => !link.id?.includes("new-"))
      .map((link) => ({
        index: link.index,
        id: link.id,
        title: link.title,
        url: link.url,
        imageUrl: link.imageUrl,
        imageId: link.imageId,
        active: link.active,
      })) as LinkUpdateInput[];

    await linkRepository.updateMany(user, updateLinksFiltered);
    // Return the updated links for client components to update store
    const result = links.map((link, index) => ({
      id: link.id?.includes("new-") ? link.id?.slice(4) : link.id || "",
      title: link.title || "",
      url: link.url || "",
      imageUrl: link.imageUrl || null,
      imageId: link.imageId || null,
      active: link.active || false,
      index: index || null,
      clicks: link.clicks || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      linkGroupId,
    }));
    return result;
  },
);
