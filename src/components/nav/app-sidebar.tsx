"use client";

import type * as React from "react";
import { useEffect, useState } from "react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getNavInfo } from "./getNavInfo";
import Link from "next/link";
import { SunMoonIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { APP_NAME } from "@/constants/app";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [data, setData] = useState<NavData | null>(null);

  useEffect(() => {
    getNavInfo().then(setData).catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <Sidebar
      collapsible="icon"
      className="bg-background border-r border-border"
      {...props}
    >
      <SidebarHeader className="bg-background border-b border-border">
        <Link
          className="flex items-center justify-center space-x-2 relative p-2 text-foreground hover:bg-accent"
          href="/"
          aria-label={"Home Page"}
        >
          <div className="flex items-center space-x-2">
            <SunMoonIcon
              className="h-10 w-10 text-primary"
              aria-hidden="true"
            />
            <p className="text-2xl font-bold text-foreground">{APP_NAME}</p>
            <Badge variant="ghost">BETA</Badge>
          </div>
        </Link>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-background border-t border-border">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
