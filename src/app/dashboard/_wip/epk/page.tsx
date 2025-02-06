import { redirectToFirstTab } from "@/actions/getFirstSidebarTab";
import { EPK_TABS } from "./tabs";

export default async function EPK() {
  redirectToFirstTab(EPK_TABS, "epk");
}
