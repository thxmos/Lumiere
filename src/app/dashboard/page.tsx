import { redirect } from "next/navigation";
import { DASHBOARD_TABS } from "./tabs";

export default function Dashboard() {
  redirect(`/dashboard/${DASHBOARD_TABS[0].key}`);
}
