"use server";

import { prisma } from "@/utils/lib/prisma";
import { User } from "@prisma/client";

export async function getUserByIdWithPassword(id: string): Promise<User> {
  const foundUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!foundUser) {
    throw new Error("User not found with id: " + id);
  }
  return foundUser;
}
