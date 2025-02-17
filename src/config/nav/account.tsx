import { UserIcon, BarChart3Icon, ImagesIcon } from "lucide-react";
import { SIDEBAR_ICON_STYLE } from "@/config/theme/styles";
import { NavItem } from "@/shared/components/layouts/sidebar-nav/types";

export const NAV_ACCOUNT: NavItem[] = [
  {
    title: "Artist Profile",
    url: "/profile",
    icon: <UserIcon className={SIDEBAR_ICON_STYLE} />,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: <BarChart3Icon className={SIDEBAR_ICON_STYLE} />,
  },
  {
    title: "Assets",
    url: "/assets",
    icon: <ImagesIcon className={SIDEBAR_ICON_STYLE} />,
  },
];
