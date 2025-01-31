"use server";

import { withAuth } from "@/utils/security/auth";
import { Country } from "@prisma/client";
import { SessionUser } from "@/utils/lib/lucia";
import { updateUserById } from "./updateUserById";
import { UserDto } from "./createUser";

// TODO: probably could just use updateUser
// OR just have specific update functions that use repository update
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
