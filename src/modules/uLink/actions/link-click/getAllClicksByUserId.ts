"use server";

import { clickRepository } from "@core/db/repositories/click";
import { SessionUser } from "@core/auth/lucia";
import { withAuth } from "@utils/security/auth";

/* getClicksByUserId()
 *
 * Used in analytics page to get all clicks for a given user
 */

export const getAllClicksByUserId = withAuth(async (user: SessionUser) => {
  try {
    const clicks = await clickRepository.getAllByUserId(user.id);
    return clicks;
  } catch (error) {
    console.error("Error getting clicks by userId", error);
    return [];
  }
});
