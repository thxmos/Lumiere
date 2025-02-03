import { redirect } from "next/navigation";
import { getFirstTab } from "./actions";

export default async function Exchange() {
  const firstTab = await getFirstTab();
  redirect(`/exchange/${firstTab?.key}`);
}
