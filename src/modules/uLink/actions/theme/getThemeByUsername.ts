import { DEFAULT_THEME } from "@ulink/default-theme";
import { getThemeByUserId } from "@ulink/actions/theme/_getThemeByUserId";
import { userRepository } from "@core/db/repositories/user";

// TODO: ensure we dont return any sensitive info
// public

export const getThemeByUsername = async (username: string) => {
  const user = await userRepository.findByUsername(username);
  if (!user) return DEFAULT_THEME;
  const theme = await getThemeByUserId(user.id);
  if (!theme) return DEFAULT_THEME;

  return theme;
};
