"use server";

import { SIDEBAR_ICON_STYLE } from "@/constants/layout";
import { userRepository } from "@/repositories/user";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";
import {
  AudioWaveformIcon,
  BarChart3Icon,
  CableIcon,
  CalendarIcon,
  CommandIcon,
  EyeIcon,
  GalleryVerticalEndIcon,
  LinkIcon,
  MailPlusIcon,
  MapIcon,
  PaintBucketIcon,
  QrCodeIcon,
  ScanEyeIcon,
  Settings2Icon,
  SwordsIcon,
  UserIcon,
  WaypointsIcon,
} from "lucide-react";

export const getNavInfo = withAuth(async (user: SessionUser) => {
  const fullUser = await userRepository.findById(user.id);

  return {
    user: {
      name: user.name,
      email: fullUser?.email ?? "",
      avatar: user.avatar,
    },
    teams: [
      // TODO: artists/accounts under user
      {
        name: "Tesko",
        logo: <GalleryVerticalEndIcon className={SIDEBAR_ICON_STYLE} />,
        plan: "Enterprise",
      },
      {
        name: "The Clear",
        logo: <AudioWaveformIcon className={SIDEBAR_ICON_STYLE} />,
        plan: "Startup",
      },
      {
        name: "Lurking Shadows",
        logo: <CommandIcon className={SIDEBAR_ICON_STYLE} />,
        plan: "Free",
      },
    ],
    projects: [
      {
        name: "Artist Profile",
        url: "/profile",
        icon: <UserIcon className={SIDEBAR_ICON_STYLE} />,
      },
      {
        name: "Analytics",
        url: "/analytics",
        icon: <BarChart3Icon className={SIDEBAR_ICON_STYLE} />,
      },
      {
        name: "Themes",
        url: "/themes",
        icon: <PaintBucketIcon className={SIDEBAR_ICON_STYLE} />,
      },
    ],
    navMain: [
      {
        title: "ULink",
        url: "/ulink",
        icon: <CableIcon className={SIDEBAR_ICON_STYLE} />,
        isActive: true,
        items: [
          {
            title: "Links",
            url: "links",
            icon: <LinkIcon className={SIDEBAR_ICON_STYLE} />,
          },
          {
            title: "QR Codes",
            url: "qr-generator",
            icon: <QrCodeIcon className={SIDEBAR_ICON_STYLE} />,
          },
          //   {
          //     title: "Settings",
          //     url: "#",
          //     icon: <Settings2Icon className={SIDEBAR_ICON_STYLE} />,
          //   },
        ],
      },
      {
        title: "Foresight",
        url: "/foresight",
        icon: <ScanEyeIcon className={SIDEBAR_ICON_STYLE} />,
        items: [
          {
            title: "Overview",
            url: "overview",
            icon: <EyeIcon className={SIDEBAR_ICON_STYLE} />,
          },
          {
            title: "Strategy",
            url: "strategy",
            icon: <SwordsIcon className={SIDEBAR_ICON_STYLE} />,
          },
          {
            title: "Pipeline",
            url: "pipeline",
            icon: <WaypointsIcon className={SIDEBAR_ICON_STYLE} />,
          },
          {
            title: "Schedule",
            url: "schedule",
            icon: <CalendarIcon className={SIDEBAR_ICON_STYLE} />,
          },
        ],
      },
      {
        title: "Kaizen",
        url: "/kaizen",
        icon: <MailPlusIcon className={SIDEBAR_ICON_STYLE} />,
        items: [
          {
            title: "Community",
            url: "community",
          },
          {
            title: "Feedback",
            url: "feedback",
          },
          {
            title: "Bug Report",
            url: "bug-report",
          },
          {
            title: "Changes",
            url: "changes",
          },
        ],
      },
    ],
  };
});
