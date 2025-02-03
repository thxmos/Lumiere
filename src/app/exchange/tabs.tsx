import { ShoppingBag } from "lucide-react";
import { SidebarTab } from "@/types/layout/SidebarTab";
import { SIDEBAR_ICON_STYLE } from "@/constants/layout";

export const EXCHANGE_TABS: SidebarTab[] = [
  {
    key: "products",
    label: "Products",
    icon: <ShoppingBag className={SIDEBAR_ICON_STYLE} />,
  },
];
