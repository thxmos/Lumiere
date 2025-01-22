import { prisma } from "@/utils/prisma";
import { OAuthProvider, User } from "@prisma/client";

export type CreateUserDto = {
  email: string;
  password: string;
  name?: string;
  avatar?: string;
};

export type UserDto = {
  id: string;
  email: string;
  name: string | null;
  username: string;
  description: string | null;
  country: string | null;
  facebookUsername: string | null;
  twitterUsername: string | null;
  instagramUsername: string | null;
  twitchUsername: string | null;
  tiktokUsername: string | null;
  spotifyUsername: string | null;
  appleMusicUsername: string | null;
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
    email: user.email.toLowerCase(),
    name: user.name,
    username: user.username,
    description: user.description,
    country: user.country,
    displayCountry: user.displayCountry || false,
    facebookUsername: user.facebookUsername,
    twitterUsername: user.twitterUsername,
    instagramUsername: user.instagramUsername,
    twitchUsername: user.twitchUsername,
    tiktokUsername: user.tiktokUsername,
    spotifyUsername: user.spotifyUsername,
    appleMusicUsername: user.appleMusicUsername,
    patreonUsername: user.patreonUsername,
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

export async function deleteUser(id: string): Promise<void> {
  await prisma.user.delete({ where: { id } });
}
