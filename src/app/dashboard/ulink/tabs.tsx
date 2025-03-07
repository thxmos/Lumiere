import { SIDEBAR_ICON_STYLE } from "@/config/theme/styles";
import { SidebarTab } from "@s-types/layout/SidebarTab";
import { Link1Icon } from "@radix-ui/react-icons";
import { Settings, QrCodeIcon, ImageIcon, PaintBucketIcon } from "lucide-react";

export const ULINK_TABS: SidebarTab[] = [
  {
    key: "account",
    label: "Account",
    icon: <Settings className={SIDEBAR_ICON_STYLE} />,
  },
  {
    key: "assets",
    label: "Assets",
    icon: <ImageIcon className={SIDEBAR_ICON_STYLE} />,
  },
  {
    key: "links",
    label: "Links",
    icon: <Link1Icon className={SIDEBAR_ICON_STYLE} />,
    mobilePreview: true,
  },
  {
    key: "theme-editor",
    label: "Theme Editor",
    icon: <PaintBucketIcon className={SIDEBAR_ICON_STYLE} />,
    mobilePreview: true,
  },
  {
    key: "qr-generator",
    label: "QR Generator",
    icon: <QrCodeIcon className={SIDEBAR_ICON_STYLE} />,
  },
];
