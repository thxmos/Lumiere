import { ShoppingBag } from "lucide-react";
import { SidebarTab } from "@/types/layout/SidebarTab";

const iconStyle = "mr-2 h-4 w-4";

export const EXCHANGE_TABS: SidebarTab[] = [
  {
    key: "products",
    label: "Products",
    icon: <ShoppingBag className={iconStyle} />,
  },
];
