import { SIDEBAR_ICON_STYLE } from "@/constants/layout";
import { SidebarTab } from "@/types/layout/SidebarTab";
import { HammerIcon } from "lucide-react";

export const EPK_TABS: SidebarTab[] = [
  {
    key: "builder",
    label: "Builder",
    icon: <HammerIcon className={SIDEBAR_ICON_STYLE} />,
  },
];
