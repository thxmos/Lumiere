"use server";

import { prisma } from "@/utils/lib/prisma";
import { del } from "@vercel/blob";
import { getUser, isValidSession } from "@/actions/entities/session";
import { Country, OAuthProvider, User } from "@prisma/client";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const updateUserAvatar = async (url: string) => {
  const { user } = await getUser();
  if (!user) return;

  try {
    const blobUrl = await getUserById(user.id);

    if (blobUrl?.avatar?.includes("public.blob.vercel-storage.com")) {
      await del(blobUrl.avatar);
    }

    await updateUserById(user.id, { avatar: url });

    return {
      success: true,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
    };
  }
};

export const getUserByUsername = async (username: string) => {
  const { user } = await getUser();
  if (!user) return null;

  const data = await prisma.user.findUnique({
    where: { username },
  });

  return data;
};

export const getUserSubscriptions = async () => {
  const { user } = await getUser();
  if (!user) return null;

  const data = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      subscriptions: true,
    },
  });

  if (!data || data.subscriptions.length === 0) return null;

  return data.subscriptions;
};

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

function toDtoMapper(user: User): UserDto {
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

export async function getUsers(): Promise<UserDto[]> {
  //use cache or no?
  const users = await prisma.user.findMany();
  return users.map(toDtoMapper);
}

export async function getUserById(id: string): Promise<UserDto> {
  const foundUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!foundUser) {
    throw new Error("User not found with id: " + id);
  }
  return toDtoMapper(foundUser);
}

export async function getUserByIdWithPassword(id: string): Promise<User> {
  const foundUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!foundUser) {
    throw new Error("User not found with id: " + id);
  }
  return foundUser;
}

export async function getUserByEmail(email: string): Promise<UserDto | null> {
  const foundUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!foundUser) {
    return null;
  }
  return toDtoMapper(foundUser);
}

export async function getUserByEmailWithPassword(email: string): Promise<User> {
  const foundUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!foundUser) {
    throw new Error("User not found with email: " + email);
  }
  return foundUser;
}

export async function updateUserById(
  id: string,
  data: Partial<User>,
): Promise<void> {
  await prisma.user.update({ where: { id }, data });
}

export async function updateUserByEmail(
  email: string,
  data: Partial<User>,
): Promise<void> {
  await prisma.user.update({ where: { email }, data });
}

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

export async function deleteUser(id: string): Promise<void> {
  await prisma.user.delete({ where: { id } });
}
