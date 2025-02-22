import { redirectToFirstTab } from "@actions/getFirstSidebarTab";
import { FORESIGHT_TABS } from "./tabs";

export default async function Foresight() {
  await redirectToFirstTab(FORESIGHT_TABS, "foresight");
}
