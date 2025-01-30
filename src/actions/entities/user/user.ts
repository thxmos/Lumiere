"use server";

import { prisma } from "@/utils/lib/prisma";
import { del } from "@vercel/blob";
import { getUser } from "@/actions/entities/session";
import { Country, OAuthProvider, User } from "@prisma/client";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";
import { hash, verify } from "@/utils/security/crypto";
import { userRepository } from "@/repositories/user";

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

// used on username page
export const getUserByUsername = async (username: string) => {
  const data = await userRepository.findByUsername(username);
  if (!data) return null;
  const { id, ...rest } = data;
  return rest;
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

export type UserDtoNoId = Omit<UserDto, "id" | "stripeCustomerId">;

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

export const updateUserAccountInfoAction = withAuth(
  async (user: SessionUser, data: Partial<UserDto>) => {
    await updateUserById(user.id, {
      username: data.username,
      description: data.description,
      country: data.country ? (data.country as Country) : Country.None,
      displayCountry: data.displayCountry,
    });
  },
);

export async function hasPasswordAction(): Promise<boolean> {
  const { user } = await getUser();
  if (!user) return false; // TODO: should throw probably or something
  const { password } = await getUserByIdWithPassword(user.id);
  const hasPassword = !!password;
  return hasPassword;
}

export async function passwordReset(formData: FormData, userId: string) {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error("All fields are required");
  }
  if (newPassword !== confirmPassword) {
    throw new Error("New password and confirmation do not match");
  }

  try {
    const user = await getUserByIdWithPassword(userId);

    if (!user.password) {
      throw new Error(
        "Authenticated via 3rd party. Cannot change password at this time",
      );
    }

    const isCurrentPasswordValid = await verify(user.password, currentPassword);

    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    const hashedPassword = await hash(newPassword);

    await updateUserById(userId, { password: hashedPassword });

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

export async function setPasswordOAuth(formData: FormData, userId: string) {
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!newPassword || !confirmPassword) {
    throw new Error("All fields are required");
  }
  if (newPassword !== confirmPassword) {
    throw new Error("New password and confirmation do not match");
  }

  try {
    const hashedPassword = await hash(newPassword);

    await updateUserById(userId, { password: hashedPassword });

    return { success: true, message: "Password set successfully" };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

export const updateUserSettings = withAuth(
  async (user: SessionUser, data: Partial<User>) => {
    await updateUserById(user.id, data);
  },
);
