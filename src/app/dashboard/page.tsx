import { redirect } from "next/navigation";
import { getFirstTab } from "./actions";

export default async function Dashboard() {
  const firstTab = await getFirstTab();
  redirect(`/dashboard/${firstTab?.key}`);
}
