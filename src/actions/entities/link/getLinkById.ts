"use server";

import { LinkRepository } from "@/repositories/link/link.repository";
import { LinkResponse } from "@/repositories/link/types";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const getLinkById = withAuth(
  async (user: SessionUser, id: string): Promise<LinkResponse> => {
    const linkRepository = new LinkRepository();
    const foundLink = await linkRepository.findById(id);
    if (!foundLink) {
      throw new Error("Link not found with id: " + id);
    }
    return foundLink;
  },
);
