"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Tab } from "@/app/ulink/tabs";
import { SparklesIcon } from "lucide-react";

type Props = {
  tabs: Tab[];
  userRole: string;
  title: string;
  headerIcon: React.ReactNode;
  path: string;
};

const LayoutSidebar: React.FC<Props> = ({
  tabs,
  title,
  userRole,
  headerIcon,
  path,
}) => {
  const pathname = usePathname();

  //max-h-[calc(100%-4rem)]
  return (
    <aside className="w-64 bg-card p-4 shadow-md h-[calc(100vh-4rem)] fixed top-16 left-0">
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center mb-4 gap-2">
          {headerIcon}
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
        <nav className="flex flex-1 flex-col h-full w-full">
          <div className="flex flex-col gap-2 flex-1 w-full">
            {tabs.map((tab) => {
              // TODO: this will eventually come in as an array of roles
              if (tab.userRole && !userRole?.includes(tab.userRole))
                return null;
              return (
                <Link href={`/${path}/${tab.key}`} key={tab.key}>
                  <Button
                    key={tab.key}
                    className="w-full justify-start"
                    variant={
                      pathname === `/${path}/${tab.key}` ? "default" : "ghost"
                    }
                  >
                    {tab.icon}
                    {tab.label}
                  </Button>
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col mt-auto">
            <Button className="w-full justify-center">
              <SparklesIcon className="h-4 w-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default LayoutSidebar;
