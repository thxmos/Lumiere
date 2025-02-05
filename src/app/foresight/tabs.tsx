import { SidebarTab } from "@/types/layout/SidebarTab";
import {
  BookUserIcon,
  CalendarRangeIcon,
  RouteIcon,
  SatelliteIcon,
  SwordsIcon,
  WaypointsIcon,
} from "lucide-react";
import { SIDEBAR_ICON_STYLE } from "@/constants/layout";
import { USER_ROLES } from "@/types/user-roles";

export const FORESIGHT_TABS: SidebarTab[] = [
  {
    key: "profile",
    label: "Profile",
    icon: <BookUserIcon className={SIDEBAR_ICON_STYLE} />,
  },
  {
    key: "roadmap",
    label: "Roadmap",
    icon: <RouteIcon className={SIDEBAR_ICON_STYLE} />,
    userRole: USER_ROLES.ADMIN,
  },
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
    userRole: USER_ROLES.ADMIN,
  },
];
