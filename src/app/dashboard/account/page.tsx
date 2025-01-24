import { getUser } from "@/actions/session.actions";
import { getUserById } from "@/data-access/user";
import { AccountSection } from "./account.section";
import UserSettingsSection from "./user-settings.section";
import { ThemeSection } from "./theme.section";

export default async function AccountSettingsPage() {
  const sessionUser = await getUser();
  const userId = sessionUser.user?.id!;
  const user = await getUserById(userId);

  return (
    <>
      <AccountSection user={user} />
      <UserSettingsSection user={user} />
      <ThemeSection />
    </>
  );
}
