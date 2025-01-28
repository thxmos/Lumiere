import { getUser } from "@/actions/session";
import { getUserById } from "@/data-access/user";
import { AccountSection } from "./account.section";

export default async function AccountSettingsPage() {
  const sessionUser = await getUser();
  const userId = sessionUser.user?.id!;
  const user = await getUserById(userId);

  return (
    <>
      <AccountSection user={user} />
    </>
  );
}
