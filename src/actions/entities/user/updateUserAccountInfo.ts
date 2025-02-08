"use server";

import { withAuth } from "@/utils/security/auth";
import { Country } from "@prisma/client";
import { SessionUser } from "@/utils/lib/lucia";
import { updateUserById } from "./updateUserById";
import { UserDto } from "./createUser";
import { getUserByUsername } from "./getUserByUsername";

// TODO: probably could just use updateUser
// OR just have specific update functions that use repository update
export const updateUserAccountInfo = withAuth(
  async (user: SessionUser, data: Partial<UserDto>) => {
    if (data.username) {
      if (data.username !== user.username) {
        const existingUsername = await getUserByUsername(data.username); // if the username is being changed, check if it already exists
        if (existingUsername) {
          throw new Error("Username already exists");
        }
      }
    } else {
      throw new Error("Username is required");
    }

    await updateUserById(user.id, {
      username: data.username,
      description: data.description,
      country: data.country ? (data.country as Country) : Country.None,
      displayCountry: data.displayCountry,
    });
  },
);
