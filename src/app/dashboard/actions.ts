"use server";

import { getUser } from "@/actions/session.actions";
import { DASHBOARD_TABS } from "./tabs";

export const getFirstTab = async () => {
  const { user } = await getUser();
  return DASHBOARD_TABS.find((tab) => tab.userRole === user?.roles);
};
