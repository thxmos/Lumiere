import { SessionUser } from "@/utils/lib/lucia";
import { getUserByIdWithPassword } from "./getUserByIdWithPassword";
import { withAuth } from "@/utils/security/auth";

/**
 * hasPasswordAction()
 * Used on security page to check if the user has a password and
 * to display the appropriate form to set or change password.
 * @returns boolean true if the user has a password, false otherwise.
 */

export const hasPasswordAction = withAuth(
  async (user: SessionUser): Promise<boolean> => {
    const { password } = await getUserByIdWithPassword(user.id);
    const hasPassword = !!password;
    return hasPassword;
  },
);
