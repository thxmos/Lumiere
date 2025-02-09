"use server";

import { clickRepository } from "@/repositories/click";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

/* getClicksByUserId()
 *
 * Used in analytics page to get all clicks for a given user
 */

export const getAllClicksByUserId = withAuth(async (user: SessionUser) => {
  const clicks = await clickRepository.getAllByUserId(user.id);
  return clicks;
});
