"use server";

import { ThemeNoId } from "@s-types/entities/theme";
import { getThemeByUserId } from "@ulink/actions/theme/_getThemeByUserId";
import { createTheme } from "@ulink/actions/theme/createTheme";
import { withAuth } from "@utils/security/auth";
import { updateThemeById } from "@ulink/actions/theme/updateThemeById";
import { SessionUser } from "@core/auth/lucia";

export const upsertTheme = withAuth(
  async (user: SessionUser, theme: ThemeNoId) => {
    const existingTheme = await getThemeByUserId(user.id);
    if (existingTheme) {
      //TODO: take out linkgroupId
      await updateThemeById(existingTheme.linkGroupId, theme);
    } else {
      await createTheme(user.id, theme);
    }
  },
);
