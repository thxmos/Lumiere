import { Link1Icon } from "@radix-ui/react-icons";
import { Settings, Lock, CreditCard } from "lucide-react";

export const DASHBOARD_TABS = [
  {
    key: "links",
    label: "Links",
    icon: <Link1Icon className={"mr-2 h-4 w-4"} />,
  },
  {
    key: "account",
    label: "Account",
    icon: <Settings className={"mr-2 h-4 w-4"} />,
  },
  {
    key: "security",
    label: "Security",
    icon: <Lock className={"mr-2 h-4 w-4"} />,
  },
  {
    key: "billing",
    label: "Billing",
    icon: <CreditCard className={"mr-2 h-4 w-4"} />,
  },
];
