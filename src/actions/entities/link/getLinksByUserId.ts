"use server";

import { linkRepository } from "@/repositories/link";
import { LinkResponse } from "@/repositories/link/types";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

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
