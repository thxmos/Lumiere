"use server";

import { LinkResponse } from "@/repositories/link/types";

import { LinkRepository } from "@/repositories/link/link.repository";
import { LinkCreateInput } from "@/repositories/link/types";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const createLink = withAuth(
  async (user: SessionUser, data: LinkCreateInput): Promise<LinkResponse> => {
    const linkRepository = new LinkRepository();
    const userLinks = await linkRepository.getLinksByUserId(user.id);

    if (userLinks.length < 10) {
      const createdLink = await linkRepository.create({
        ...data,
        user: { connect: { id: user.id } },
      });
      return createdLink;
    } else {
      throw new Error("You have reached the maximum number of links");
    }
  },
);
