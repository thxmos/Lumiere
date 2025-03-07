"use server";

import { linkRepository } from "@core/db/repositories/link";
import { LinkResponse } from "@core/db/repositories/link/types";
import { SessionUser } from "@core/auth/lucia";
import { withAuth } from "@utils/security/auth";

/*
 * getLinksByUserId()
 */

export const getLinksByUserId = withAuth(
  async (user: SessionUser): Promise<LinkResponse[]> => {
    try {
      const links = await linkRepository.getLinksByUserId(user.id);
      return links;
    } catch (error) {
      console.error("Error getting links by userId", error);
      return [];
    }
  },
);
