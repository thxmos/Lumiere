"use server";

import { BrowserData } from "@/modules/shared/types/clicks";
import { getClientData } from "@/actions/foresight/analytics";
import { clickRepository } from "@/modules/shared/core/db/repositories/click";
import { SocialMedia } from "@prisma/client";

/* createClickSocial()
 *
 * Takes linkId and browser data and tracks clicks on social media icons
 * Triggered by any user on profile page so needs to be unauthenticated
 */

export const createClickSocial = async (
  username: string,
  socialPlatform: SocialMedia,
  data: Partial<BrowserData>,
) => {
  const clientData = await getClientData(data);

  clickRepository.create({
    user: {
      connect: {
        username: username,
      },
    },
    ...clientData,
    socialPlatform,
  });
};
