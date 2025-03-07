import { SIDEBAR_ICON_STYLE } from "../theme/styles";
import {
  CableIcon,
  ScanEyeIcon,
  EyeIcon,
  SwordsIcon,
  WaypointsIcon,
  CalendarIcon,
  LinkIcon,
  QrCodeIcon,
  UsersIcon,
  MessageSquareIcon,
  BugIcon,
  BookMarkedIcon,
  MailPlusIcon,
} from "lucide-react";

export const NAV_MODULES = [
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
  // {
  //   title: "Kaizen",
  //   description: "Grow with the community",
  //   url: "/kaizen",
  //   icon: <MailPlusIcon className={SIDEBAR_ICON_STYLE} />,
  //   items: [
  //     {
  //       title: "Community",
  //       url: "community",
  //       icon: <UsersIcon className={SIDEBAR_ICON_STYLE} />,
  //     },
  //     {
  //       title: "Feedback",
  //       url: "feedback",
  //       icon: <MessageSquareIcon className={SIDEBAR_ICON_STYLE} />,
  //     },
  //     {
  //       title: "Bug Report",
  //       url: "bug-report",
  //       icon: <BugIcon className={SIDEBAR_ICON_STYLE} />,
  //     },
  //     {
  //       title: "Documentation",
  //       url: "documentation",
  //       icon: <BookMarkedIcon className={SIDEBAR_ICON_STYLE} />,
  //     },
  //   ],
  // },
];
