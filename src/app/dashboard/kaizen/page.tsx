import { redirectToFirstTab } from "@actions/getFirstSidebarTab";
import { KAIZEN_TABS } from "./tabs";

export default async function Kaizen() {
  redirectToFirstTab(KAIZEN_TABS, "kaizen");
}
