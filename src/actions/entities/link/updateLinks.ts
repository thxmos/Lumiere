"use server";

import { LinkUpdateDto } from "@/repositories/link/types";

import { LinkUpdateInput } from "@/repositories/link/types";
import { SessionUser } from "@/utils/lib/lucia";
import { prisma } from "@/utils/lib/prisma";
import { withAuth } from "@/utils/security/auth";

//TODO: doesn't work apparently
export const updateLinks = withAuth(
  async (user: SessionUser, data: LinkUpdateDto[]): Promise<void> => {
    for (const link of data) {
      await prisma.link.update({
        where: { id: link.id },
        data: {
          ...link,
          user: { connect: { id: user.id } },
        } as LinkUpdateInput,
      });
    }
  },
);
