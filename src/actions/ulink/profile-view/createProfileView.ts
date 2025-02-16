"use server";

import { prisma } from "@/modules/shared/core/db/prisma";

// TODO: make a repository for this

export const createProfileView = async (username: string) => {
  const profileView = await prisma.profileView.create({
    data: {
      user: {
        connect: {
          username: username,
        },
      },
    },
  });

  return profileView;
};
