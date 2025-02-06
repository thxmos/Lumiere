import { redirectToFirstTab } from "@/actions/getFirstSidebarTab";
import { EXCHANGE_TABS } from "./tabs";

export default async function Exchange() {
  await redirectToFirstTab(EXCHANGE_TABS, "exchange");
}
