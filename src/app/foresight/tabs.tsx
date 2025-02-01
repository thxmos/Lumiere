import { USER_ROLES } from "@/constants/user";
import { SwordsIcon, WaypointsIcon } from "lucide-react";

const iconStyle = "mr-2 h-4 w-4";

export type Tab = {
  key: string;
  label: string;
  icon: React.ReactNode;
  userRole?: string;
  mobilePreview?: boolean;
};

//TODO: Rename key to path or something
export const FORESIGHT_TABS: Tab[] = [
  {
    key: "strategy",
    label: "Strategy",
    icon: <SwordsIcon className={iconStyle} />,
  },
  {
    key: "pipeline",
    label: "Pipeline",
    icon: <WaypointsIcon className={iconStyle} />,
  },
];
