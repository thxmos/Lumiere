"use server";

import { clickRepository } from "@/repositories/click";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

export const getNumOfClicksByLinkId = withAuth(
  async (user: SessionUser, linkId: string) => {
    const clicks = await clickRepository.getAllByLinkId(linkId);
    return clicks.length;
  },
);
