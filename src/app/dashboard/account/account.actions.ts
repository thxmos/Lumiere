"use server";

import { updateUserById } from "@/data-access/user";

import { UserDto } from "@/data-access/user";
import { withAuth } from "@/utils/auth";
import { SessionUser } from "@/utils/lucia";
import { Country } from "@prisma/client";

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
