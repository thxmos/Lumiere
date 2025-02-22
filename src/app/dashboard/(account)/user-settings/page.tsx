import { redirectToFirstTab } from "@actions/getFirstSidebarTab";
import { USER_SETTINGS_TABS } from "./tabs";

export default async function UserSettings() {
  await redirectToFirstTab(USER_SETTINGS_TABS, "user-settings");
}
