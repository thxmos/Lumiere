"use server";

import { getUser } from "@/actions/session";
import { DASHBOARD_TABS } from "./tabs";
import { USER_ROLES } from "@/constants/user";
import { redirect } from "next/navigation";

// Get the first tab that the user has access to
export const getFirstTab = async () => {
  const { user } = await getUser();
  const userRole = user?.roles || USER_ROLES.USER;

  // First try to find a tab specific to the user's role
  const roleSpecificTab = DASHBOARD_TABS.find(
    (tab) => tab.userRole === userRole,
  );
  if (roleSpecificTab) {
    return roleSpecificTab;
  }

  // If no role-specific tab found, find the first tab that either:
  // 1. Has no userRole specified (accessible to all)
  // 2. Or matches the default USER role
  const defaultTab = DASHBOARD_TABS.find(
    (tab) => !tab.userRole || tab.userRole === USER_ROLES.USER,
  );

  // If still no tab found, redirect to account
  if (!defaultTab) {
    redirect("/dashboard/account");
  }

  return defaultTab;
};
