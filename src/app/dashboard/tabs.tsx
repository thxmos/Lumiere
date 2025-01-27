import { USER_ROLES } from "@/constants/user";
import { Link1Icon } from "@radix-ui/react-icons";
import {
  Settings,
  Lock,
  Paintbrush,
  ShoppingBag,
  QrCodeIcon,
  Wrench,
  User,
  ImageIcon,
  BarChart,
} from "lucide-react";

const iconStyle = "mr-2 h-4 w-4";

export type Tab = {
  key: string;
  label: string;
  icon: React.ReactNode;
  userRole?: string;
  mobilePreview?: boolean;
};

export const DASHBOARD_TABS: Tab[] = [
  {
    key: "account",
    label: "Account",
    icon: <Settings className={iconStyle} />,
  },
  {
    key: "assets",
    label: "Assets ⭐",
    icon: <ImageIcon className={iconStyle} />,
    userRole: USER_ROLES.ADMIN,
  },
  {
    key: "links",
    label: "Links",
    icon: <Link1Icon className={iconStyle} />,
    mobilePreview: true,
  },
  {
    key: "theme-editor",
    label: "Theme Editor",
    icon: <Paintbrush className={iconStyle} />,
    mobilePreview: true,
  },
  {
    key: "qr-generator",
    label: "QR Generator",
    icon: <QrCodeIcon className={iconStyle} />,
  },

  {
    key: "products",
    label: "Products ⭐",
    icon: <ShoppingBag className={iconStyle} />,
    userRole: USER_ROLES.ADMIN,
  },
  {
    key: "analytics",
    label: "Analytics ⭐",
    icon: <BarChart className={iconStyle} />,
    userRole: USER_ROLES.ADMIN,
  },
  // {
  //   key: "release-planner",
  //   label: "Release Planner",
  //   icon: <Calendar className={iconStyle} />,
  // },
  {
    key: "security",
    label: "Security",
    icon: <Lock className={iconStyle} />,
  },
  // {
  //   key: "billing",
  //   label: "Billing",
  //   icon: <CreditCard className={iconStyle} />,
  // },
  {
    key: "user-settings",
    label: "User Settings",
    icon: <User className={iconStyle} />,
  },
  {
    key: "admin",
    label: "Admin ⭐",
    icon: <Wrench className={iconStyle} />,
    userRole: USER_ROLES.ADMIN,
  },
];
