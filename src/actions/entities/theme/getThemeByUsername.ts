import { DEFAULT_THEME } from "@/config/theme/theme";
import { getThemeByUserId } from "./_getThemeByUserId";
import { userRepository } from "@/modules/shared/core/db/repositories/user";

// TODO: ensure we dont return any sensitive info
// public

export const getThemeByUsername = async (username: string) => {
  const user = await userRepository.findByUsername(username);
  if (!user) return DEFAULT_THEME;
  const theme = await getThemeByUserId(user.id);
  if (!theme) return DEFAULT_THEME;

  return theme;
};
