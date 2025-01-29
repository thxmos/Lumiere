"use server";

import { isValidSession } from "@/actions/entities/session";
import { updateUserById } from "@/actions/entities/user";
import { User } from "@prisma/client";

export async function updateUser(userId: string, data: Partial<User>) {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }

  await updateUserById(userId, data);
}
