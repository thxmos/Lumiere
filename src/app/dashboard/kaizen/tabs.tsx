import { SIDEBAR_ICON_STYLE } from "@/constants/layout";
import { SidebarTab } from "@/types/layout/SidebarTab";
import { BugIcon, MessageCircleIcon } from "lucide-react";

//TODO: Rename key to path or something
export const KAIZEN_TABS: SidebarTab[] = [
  {
    key: "feedback",
    label: "Feedback",
    icon: <MessageCircleIcon className={SIDEBAR_ICON_STYLE} />,
  },
  {
    key: "bugs",
    label: "Bugs",
    icon: <BugIcon className={SIDEBAR_ICON_STYLE} />,
  },
];
