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

export async function deleteUser(id: string): Promise<void> {
  await prisma.user.delete({ where: { id } });
}
