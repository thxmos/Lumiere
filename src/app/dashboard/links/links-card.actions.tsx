"use server";

import { getUser, isValidSession } from "@/actions/session.actions";
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
  console.log(links);

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

export async function getLinks(userId: string) {
  const links = await getLinksByUserId(userId);
  if (!links) return [];
  return links
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
    .map((link, index) => ({
      ...link,
      index: link.index !== null ? link.index : index,
    }));
}

export async function deleteLink(id: string) {
  await deleteLinkById(id);
}
