import {
  BugIcon,
  CalendarRangeIcon,
  MessageCircleIcon,
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
export const KAIZEN_TABS: Tab[] = [
  {
    key: "feedback",
    label: "Feedback",
    icon: <MessageCircleIcon className={iconStyle} />,
  },
  {
    key: "bugs",
    label: "Bugs",
    icon: <BugIcon className={iconStyle} />,
  },
];
