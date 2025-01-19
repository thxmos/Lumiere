import { Link1Icon } from "@radix-ui/react-icons";
import {
  Settings,
  Lock,
  CreditCard,
  Paintbrush,
  BarChart,
  ShoppingBag,
  Calendar,
  QrCodeIcon,
} from "lucide-react";

const iconStyle = "mr-2 h-4 w-4";

export const DASHBOARD_TABS = [
  {
    key: "links",
    label: "Links",
    icon: <Link1Icon className={iconStyle} />,
  },
  {
    key: "theme-editor",
    label: "Theme Editor",
    icon: <Paintbrush className={iconStyle} />,
  },
  {
    key: "qr-generator",
    label: "QR Generator",
    icon: <QrCodeIcon className={iconStyle} />,
  },
  {
    key: "metrics",
    label: "Metrics",
    icon: <BarChart className={iconStyle} />,
  },
  {
    key: "merch",
    label: "Merch",
    icon: <ShoppingBag className={iconStyle} />,
  },
  {
    key: "release-planner",
    label: "Release Planner",
    icon: <Calendar className={iconStyle} />,
  },
  {
    key: "account",
    label: "Account",
    icon: <Settings className={iconStyle} />,
  },
  {
    key: "security",
    label: "Security",
    icon: <Lock className={iconStyle} />,
  },
  {
    key: "billing",
    label: "Billing",
    icon: <CreditCard className={iconStyle} />,
  },
];
