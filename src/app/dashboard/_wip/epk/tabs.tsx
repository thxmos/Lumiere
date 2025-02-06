import {
  CalendarRangeIcon,
  HammerIcon,
  SwordsIcon,
  WaypointsIcon,
} from "lucide-react";

const iconStyle = "mr-2 h-4 w-4";

export type Tab = {
  key: string;
  label: string;
  icon: React.ReactNode;
  userRole?: string;
  mobilePreview?: boolean;
};

//TODO: Rename key to path or something
export const EPK_TABS: Tab[] = [
  {
    key: "builder",
    label: "Builder",
    icon: <HammerIcon className={iconStyle} />,
  },
];
