"use server";

import { prisma } from "@/utils/lib/prisma";
import { OAuthProvider, User } from "@prisma/client";

export type CreateUserDto = {
  email: string;
  password: string;
  name?: string;
  avatar?: string;
};

export type UserDto = {
  id: string;
  roles: string;
  email: string;
  name: string | null;
  username: string;
  description: string | null;
  country: string | null;
  displayCountry: boolean;
  appleMusicUsername: string | null;
  discordUsername: string | null;
  facebookUsername: string | null;
  instagramUsername: string | null;
  spotifyUsername: string | null;
  tiktokUsername: string | null;
  twitchUsername: string | null;
  twitterUsername: string | null;
  patreonUsername: string | null;
  youtubeUsername: string | null;
  avatar: string | null;
  isVerified: boolean;
  stripeCustomerId: string | null;
  oAuthProvider: OAuthProvider | null;
};

export type UserDtoNoId = Omit<UserDto, "id" | "stripeCustomerId">;

export async function toDtoMapper(user: User): Promise<UserDto> {
  return {
    id: user.id,
    roles: user.roles,
    email: user.email.toLowerCase(),
    name: user.name,
    username: user.username,
    description: user.description,
    country: user.country,
    displayCountry: user.displayCountry,
    appleMusicUsername: user.appleMusicUsername,
    discordUsername: user.discordUsername,
    facebookUsername: user.facebookUsername,
    instagramUsername: user.instagramUsername,
    patreonUsername: user.patreonUsername,
    spotifyUsername: user.spotifyUsername,
    tiktokUsername: user.tiktokUsername,
    twitchUsername: user.twitchUsername,
    twitterUsername: user.twitterUsername,
    youtubeUsername: user.youtubeUsername,
    avatar: user.avatar,
    isVerified: user.isVerified,
    stripeCustomerId: user.stripeCustomerId,
    oAuthProvider: user.oAuthProvider,
  };
}

export async function createUser(data: CreateUserDto): Promise<UserDto> {
  const createdUser = await prisma.user.create({ data });
  return toDtoMapper(createdUser);
}
