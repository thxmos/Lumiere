"use server";

import { getUser, isValidSession } from "@/actions/session.actions";
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
import { ValidateSessionOrThrow } from "@/utils/sessions";
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
    twitchUsername: data.twitchUsername,
    instagramUsername: data.instagramUsername,
    facebookUsername: data.facebookUsername,
    twitterUsername: data.twitterUsername,
    patreonUsername: data.patreonUsername,
    youtubeUsername: data.youtubeUsername,
    appleMusicUsername: data.appleMusicUsername,
    spotifyUsername: data.spotifyUsername,
    tiktokUsername: data.tiktokUsername,
  });
}

export async function updateUserLinksAction(links: Partial<LinkDto>[]) {
  ValidateSessionOrThrow();
  if (!links) return;

  const user = await getUser();
  const userId = user.user?.id!;

  const createLinksFiltered = links
    ?.filter((link, index) => {
      if (!link.id) {
        return {
          ...link,
          index,
        };
      }
    })
    .map((link) => ({
      title: link.title,
      url: link.url,
      imageUrl: link.imageUrl,
      userId: userId,
      index: link.index,
      active: link.active,
      id: link.id,
    })) as CreateLinkDto[];
  await createLinks(createLinksFiltered);

  const updateLinksFiltered = links
    ?.filter((link) => link.id)
    .map((link) => ({
      title: link.title,
      url: link.url,
      imageUrl: link.imageUrl,
      userId: userId,
      id: link.id,
      active: link.active,
      index: link.index,
    })) as LinkDto[];
  await updateLinks(updateLinksFiltered);
}

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
