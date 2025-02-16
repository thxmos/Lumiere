import { LockIcon, UserIcon } from "lucide-react";
import { SidebarTab } from "@/shared/types/layout/SidebarTab";
import { SIDEBAR_ICON_STYLE } from "@/config/constants/layout";

export const USER_SETTINGS_TABS: SidebarTab[] = [
  {
    key: "security",
    label: "Security",
    icon: <LockIcon className={SIDEBAR_ICON_STYLE} />,
  },
  {
    key: "user-settings",
    label: "User Settings",
    icon: <UserIcon className={SIDEBAR_ICON_STYLE} />,
  },
];
