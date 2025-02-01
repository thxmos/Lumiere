"use client";

import { ScanEyeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Tab } from "@/app/ulink/tabs";

type Props = {
  tabs: Tab[];
  userRole: string;
  title: string;
  headerIcon: React.ReactNode;
};

const LayoutSidebar: React.FC<Props> = ({
  tabs,
  title,
  userRole,
  headerIcon,
}) => {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-card p-6 shadow-md h-full">
      <div className="flex items-center mb-8 gap-2">
        {headerIcon}
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <nav>
        {tabs.map((tab) => {
          // TODO: this will eventually come in as an array of roles
          if (tab.userRole && !userRole?.includes(tab.userRole)) return null;
          return (
            <Link href={`/ulink/${tab.key}`} key={tab.key}>
              <Button
                key={tab.key}
                className="w-full justify-start mb-2"
                variant={pathname === `/ulink/${tab.key}` ? "default" : "ghost"}
              >
                {tab.icon}
                {tab.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default LayoutSidebar;
