"use server";

import { prisma } from "@/modules/shared/core/db/prisma";
import { User } from "@prisma/client";

/*
 * getUserByIdWithPassword
 *
 * Used in authentication flows, ideally there should be a service layer or something that deals with sanitized data
 * This is a temporary solution to get the user by id with password by directly accessing the database instead of using the repository
 */

export async function getUserByIdWithPassword(id: string): Promise<User> {
  const foundUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!foundUser) {
    throw new Error("User not found with id: " + id);
  }
  return foundUser;
}
