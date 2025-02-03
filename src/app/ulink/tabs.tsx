import { SIDEBAR_ICON_STYLE } from "@/constants/layout";
import { SidebarTab } from "@/types/layout/SidebarTab";
import { Link1Icon } from "@radix-ui/react-icons";
import {
  Settings,
  Lock,
  Paintbrush,
  QrCodeIcon,
  User,
  ImageIcon,
} from "lucide-react";

export const ULINK_TABS: SidebarTab[] = [
  {
    key: "account",
    label: "Account",
    icon: <Settings className={SIDEBAR_ICON_STYLE} />,
  },
  {
    key: "assets",
    label: "Assets",
    icon: <ImageIcon className={SIDEBAR_ICON_STYLE} />,
  },
  {
    key: "links",
    label: "Links",
    icon: <Link1Icon className={SIDEBAR_ICON_STYLE} />,
    mobilePreview: true,
  },
  {
    key: "theme-editor",
    label: "Theme Editor",
    icon: <Paintbrush className={SIDEBAR_ICON_STYLE} />,
    mobilePreview: true,
  },
  {
    key: "qr-generator",
    label: "QR Generator",
    icon: <QrCodeIcon className={SIDEBAR_ICON_STYLE} />,
  },
  // {
  //   key: "analytics",
  //   label: "Analytics ⭐",
  //   icon: <BarChart className={iconStyle} />,
  //   userRole: USER_ROLES.ADMIN,
  // },
  {
    key: "security",
    label: "Security",
    icon: <Lock className={SIDEBAR_ICON_STYLE} />,
  },
  {
    key: "user-settings",
    label: "User Settings",
    icon: <User className={SIDEBAR_ICON_STYLE} />,
  },
  // {
  //   key: "admin",
  //   label: "Admin ⭐",
  //   icon: <Wrench className={iconStyle} />,
  //   userRole: USER_ROLES.ADMIN,
  // },
];
