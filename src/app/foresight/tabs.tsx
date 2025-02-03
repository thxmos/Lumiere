import { SidebarTab } from "@/types/layout/SidebarTab";
import { CalendarRangeIcon, SwordsIcon, WaypointsIcon } from "lucide-react";
import { SIDEBAR_ICON_STYLE } from "@/constants/layout";

export const FORESIGHT_TABS: SidebarTab[] = [
  {
    key: "strategy",
    label: "Strategy",
    icon: <SwordsIcon className={SIDEBAR_ICON_STYLE} />,
  },
  {
    key: "pipeline",
    label: "Pipeline",
    icon: <WaypointsIcon className={SIDEBAR_ICON_STYLE} />,
  },
  {
    key: "calendar",
    label: "Calendar",
    icon: <CalendarRangeIcon className={SIDEBAR_ICON_STYLE} />,
  },
];
