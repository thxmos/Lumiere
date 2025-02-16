"use client";

import type * as React from "react";
import { useEffect, useState } from "react";
import { NavMain } from "./nav-main";
import NavAccount from "./nav-account";
import { NavUser } from "./nav-user";
import { AccountSwitcher } from "./account-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/modules/shared/components/ui/sidebar";
import { getNavInfo } from "./get-nav-info";
import Link from "next/link";
import { SunMoonIcon } from "lucide-react";
import { Badge } from "@/modules/shared/components/ui/badge";
import { APP_NAME } from "@/config/constants/app";
import { cn } from "@/utils/utils";
import { SidebarSkeleton } from "./sidebar-skeleton";
import { NavData } from "./types";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [data, setData] = useState<NavData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getNavInfo();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  if (!data) {
    return null;
  }

  return (
    <Sidebar
      collapsible="icon"
      className="bg-background border-r border-border"
      {...props}
    >
      <SidebarHeader className="bg-background border-b border-border">
        <Link
          className="flex items-center relative p-2 text-foreground"
          href="/"
          aria-label="Home Page"
        >
          <div
            className={cn(
              "flex items-center",
              isExpanded ? "space-x-2" : "justify-center w-full",
            )}
          >
            <SunMoonIcon
              className="h-10 w-10 text-primary"
              aria-hidden="true"
            />
            {isExpanded && (
              <>
                <p className="text-2xl font-bold text-foreground">{APP_NAME}</p>
                <Badge variant="outline">BETA</Badge>
              </>
            )}
          </div>
        </Link>
        <AccountSwitcher accounts={data.userAccounts} />
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <NavAccount account={data.account} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-background border-t border-border">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
