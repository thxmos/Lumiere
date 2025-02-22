"use server";

import { withAuth } from "@utils/security/auth";
import { userRepository } from "@core/db/repositories/user";
import {
  AudioWaveformIcon,
  CommandIcon,
  GalleryVerticalEndIcon,
} from "lucide-react";
import { NavData } from "./types";
import { SessionUser } from "@core/auth/lucia";
import { SIDEBAR_ICON_STYLE } from "@/config/theme/styles";
import { NAV_MODULES } from "@/config/nav/modules";
import { NAV_ACCOUNT } from "@/config/nav/account";

export const getNavInfo = withAuth(
  async (user: SessionUser): Promise<NavData> => {
    const fullUser = await userRepository.findById(user.id);

    return {
      user: {
        name: user.name,
        email: fullUser?.email ?? "",
        avatar: user.avatar,
      },
      userAccounts: [
        {
          title: "Tesko",
          logo: <GalleryVerticalEndIcon className={SIDEBAR_ICON_STYLE} />,
          plan: "Artist/Musician",
        },
        {
          title: "The Clear",
          logo: <AudioWaveformIcon className={SIDEBAR_ICON_STYLE} />,
          plan: "Artist/Musician",
        },
        {
          title: "Lurking Shadows",
          logo: <CommandIcon className={SIDEBAR_ICON_STYLE} />,
          plan: "Artist/Musician",
        },
      ],
      account: NAV_ACCOUNT,
      navMain: NAV_MODULES,
    };
  },
);
