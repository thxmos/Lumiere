"use server";

import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/core/auth/lucia";
import { updateUserById } from "./updateUserById";
import { UserDto } from "./createUser";
import { Country } from "@prisma/client";

// TODO: clean up this disgusting mess
export const updateUser = withAuth(
  async (user: SessionUser, data: Partial<UserDto>) => {
    await updateUserById(user.id, {
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
  },
);
