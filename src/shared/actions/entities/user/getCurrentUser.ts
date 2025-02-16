import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/shared/core/auth/lucia";
import { userRepository } from "@/shared/core/db/repositories/user";

/*
 * Gets the current user from session
 */

export const getCurrentUser = withAuth(async (user: SessionUser) => {
  const foundUser = await userRepository.findById(user.id);

  if (!foundUser) {
    throw new Error("User not found with id: " + user.id);
  }

  return foundUser;
});
