"use server";

import { userRepository } from "@/repositories/user";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";
import {
  AudioWaveformIcon,
  BarChart3Icon,
  BookMarkedIcon,
  BugIcon,
  CableIcon,
  CalendarIcon,
  CommandIcon,
  EyeIcon,
  GalleryVerticalEndIcon,
  ImagesIcon,
  LinkIcon,
  MailPlusIcon,
  MessageSquareIcon,
  PaintBucketIcon,
  QrCodeIcon,
  ScanEyeIcon,
  SwordsIcon,
  UserIcon,
  UsersIcon,
  WaypointsIcon,
} from "lucide-react";

const SIDEBAR_ICON_STYLE = "h-4 w-4";

export const getNavInfo = withAuth(async (user: SessionUser) => {
  const fullUser = await userRepository.findById(user.id);

  return {
    user: {
      name: user.name,
      email: fullUser?.email ?? "",
      avatar: user.avatar,
    },
    accounts: [
      // TODO: artists/accounts under user

      {
        name: "Tesko",
        logo: <GalleryVerticalEndIcon className={SIDEBAR_ICON_STYLE} />,
        plan: "Artist/Musician",
      },
      {
        name: "The Clear",
        logo: <AudioWaveformIcon className={SIDEBAR_ICON_STYLE} />,
        plan: "Artist/Musician",
      },
      {
        name: "Lurking Shadows",
        logo: <CommandIcon className={SIDEBAR_ICON_STYLE} />,
        plan: "Artist/Musician",
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
      {
        name: "Assets",
        url: "/assets",
        icon: <ImagesIcon className={SIDEBAR_ICON_STYLE} />,
      },
    ],
    navMain: [
      {
        title: "ULink",
        description: "Connect with your audience",
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
        description: "Light up your next step",
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
        description: "Grow with the community",
        url: "/kaizen",
        icon: <MailPlusIcon className={SIDEBAR_ICON_STYLE} />,
        items: [
          {
            title: "Community",
            url: "community",
            icon: <UsersIcon className={SIDEBAR_ICON_STYLE} />,
          },
          {
            title: "Feedback",
            url: "feedback",
            icon: <MessageSquareIcon className={SIDEBAR_ICON_STYLE} />,
          },
          {
            title: "Bug Report",
            url: "bug-report",
            icon: <BugIcon className={SIDEBAR_ICON_STYLE} />,
          },
          {
            title: "Documentation",
            url: "documentation",
            icon: <BookMarkedIcon className={SIDEBAR_ICON_STYLE} />,
          },
        ],
      },
    ],
  };
});
