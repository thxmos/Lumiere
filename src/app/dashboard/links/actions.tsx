"use server";

import { isValidSession } from "@/actions/session";
import { getClicksByLinkId } from "@/data-access/clicks";
import { deleteImage } from "@/data-access/images";
import {
  CreateLinkDto,
  createLinks,
  deleteLinkById,
  getLinksByUserId,
  LinkDto,
  updateLinks,
} from "@/data-access/links";
import { updateUserById, UserDto } from "@/data-access/user";
import { withAuth } from "@/utils/auth";
import { SessionUser } from "@/utils/lucia";
import { Country } from "@prisma/client";

export async function updateUser(userId: string, data: Partial<UserDto>) {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }

  // TODO: clean up this disgusting mess
  await updateUserById(userId, {
    username: data.username,
    description: data.description,
    country: data.country as Country,
    appleMusicUsername: data.appleMusicUsername,
    discordUsername: data.discordUsername,
    facebookUsername: data.facebookUsername,
    instagramUsername: data.instagramUsername,
    patreonUsername: data.patreonUsername,
    spotifyUsername: data.spotifyUsername,
    tiktokUsername: data.tiktokUsername,
    twitchUsername: data.twitchUsername,
    twitterUsername: data.twitterUsername,
    youtubeUsername: data.youtubeUsername,
  });
}

export const updateUserLinksAction = withAuth(
  async (user: SessionUser, links: Partial<LinkDto>[]) => {
    if (!links) return;

    const createLinksFiltered = links
      ?.filter((link) => link.id?.includes("new-"))
      .map((link, index) => ({
        id: link.id?.slice(4) || "",
        title: link.title,
        url: link.url,
        imageUrl: link.imageUrl,
        userId: user.id,
        active: link.active,
        index,
      })) as CreateLinkDto[];

    await createLinks(createLinksFiltered);

    const updateLinksFiltered = links
      ?.filter((link) => !link.id?.includes("new-"))
      .map((link) => ({
        title: link.title,
        url: link.url,
        imageUrl: link.imageUrl,
        userId: user.id,
        id: link.id,
        active: link.active,
        index: link.index,
      })) as LinkDto[];
    await updateLinks(updateLinksFiltered);

    // Return the updated links for client components to update store
    const result = links.map((link, index) => ({
      id: link.id?.includes("new-") ? link.id?.slice(4) : link.id,
      title: link.title,
      url: link.url,
      imageUrl: link.imageUrl,
      userId: user.id,
      active: link.active,
      index,
    })) as LinkDto[];
    return result;
  },
);

export async function getLinksWithNumOfClicks(userId: string) {
  const links = await getLinksByUserId(userId);
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
    const clicks = await getNumOfClicksByLinkId(link.id);
    link.clicks = clicks;
  }

  return linksWithClicks;
}

export async function getNumOfClicksByLinkId(linkId: string) {
  const clicks = await getClicksByLinkId(linkId);
  return clicks.length;
}

export async function deleteLink(link: LinkDto) {
  await deleteLinkById(link.id);
  if (link.imageUrl) {
    await deleteImage(link.imageUrl, link.userId);
  }
}
