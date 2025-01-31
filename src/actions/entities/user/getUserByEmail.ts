"use server";

import { UserDto } from "./createUser";

import { prisma } from "@/utils/lib/prisma";
import { toDtoMapper } from "./createUser";

export async function getUserByEmail(email: string): Promise<UserDto | null> {
  const foundUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!foundUser) {
    return null;
  }
  return toDtoMapper(foundUser);
}
