"use server";

import { updateUserById } from "@/data-access/user";

import { UserDto } from "@/data-access/user";
import { Country } from "@prisma/client";
import { ValidateSessionOrThrow } from "@/utils/sessions";

export async function updateUserAccountInfoAction(
  userId: string,
  data: Partial<UserDto>,
) {
  ValidateSessionOrThrow();

  await updateUserById(userId, {
    username: data.username,
    description: data.description,
    country: data.country as Country,
  });
}
