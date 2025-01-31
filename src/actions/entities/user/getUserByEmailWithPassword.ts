"use server";

import { prisma } from "@/utils/lib/prisma";
import { User } from "@prisma/client";

export async function getUserByEmailWithPassword(email: string): Promise<User> {
  const foundUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!foundUser) {
    throw new Error("User not found with email: " + email);
  }
  return foundUser;
}
