import { redirectToFirstTab } from "@actions/getFirstSidebarTab";
import { ULINK_TABS } from "./tabs";

export default async function ULink() {
  await redirectToFirstTab(ULINK_TABS, "ulink");
}
