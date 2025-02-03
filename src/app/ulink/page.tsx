import { redirectToFirstTab } from "@/actions/getFirstSidebarTab";
import { DASHBOARD_TABS } from "./tabs";

export default async function Dashboard() {
  await redirectToFirstTab(DASHBOARD_TABS, "ulink");
}
