"use server";

import { updateUserById } from "@/actions/entities/user";
import { UserDto } from "@/actions/entities/user";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";
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
