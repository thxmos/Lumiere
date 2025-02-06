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

interface NavData {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  teams: Array<{
    name: string;
    logo: React.ReactNode;
    plan: string;
  }>;
  navMain: Array<{
    title: string;
    url: string;
    icon: React.ReactNode;
    isActive?: boolean;
    items?: Array<{
      title: string;
      url: string;
    }>;
  }>;
  projects: Array<{
    name: string;
    url: string;
    icon: React.ReactNode;
  }>;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [data, setData] = useState<NavData | null>(null);

  useEffect(() => {
    getNavInfo().then(setData).catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link
          className="flex items-center justify-center space-x-2 relative p-2"
          href="/"
          aria-label={"Home Page"}
        >
          <div className="animate-gradient-x bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 bg-[length:200%_auto] bg-clip-text text-transparent transition-all flex items-center space-x-2">
            <SunMoonIcon
              className="h-10 w-10 text-orange-500"
              aria-hidden="true"
            />
            <p className="text-2xl font-bold">{APP_NAME}</p>
            <Badge variant="ghost" className="border-primary">
              BETA
            </Badge>{" "}
            {/* its complaining but it works*/}
          </div>
        </Link>{" "}
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
