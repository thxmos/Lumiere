"use server";

import { USER_ROLES } from "@/shared/types/user-roles";
import { redirect } from "next/navigation";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/core/auth/lucia";
import { SidebarTab } from "@/shared/types/layout/SidebarTab";

// Used by all pages that have a sidebar
// Gets the first tab that the user has access to

export const redirectToFirstTab = withAuth(
  async (user: SessionUser, tabs: SidebarTab[], path: string) => {
    if (tabs.length === 0) {
      redirect("/");
    }

    const userRole = user?.roles || USER_ROLES.USER;

    // If user is admin, redirect to the first tab
    if (userRole === USER_ROLES.ADMIN) {
      redirect(`/${path}/${tabs[0].key}`);
    }

    // If no role-specific tab found, find the first tab that either:
    // 1. Has no userRole specified (accessible to all)
    // 2. Or matches the current user's role
    const defaultTab = tabs.find(
      (tab) => !tab.userRole || tab.userRole === user.roles,
    );

    // If still no tab found, redirect to account
    if (!defaultTab) {
      redirect(`/${path}/account`);
    }

    redirect(`/${path}/${defaultTab?.key}`);
  },
);
