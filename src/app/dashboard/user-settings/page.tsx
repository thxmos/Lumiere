import { getUser } from "@/actions/entities/session";
import { getUserById } from "@/data-access/user";
import UserSettingsSection from "./user-settings.section";
import { UserThemeSection } from "./user-theme.section";

export default async function UserSettingsPage() {
  const sessionUser = await getUser();
  const userId = sessionUser.user?.id!;
  const user = await getUserById(userId);

  return (
    <>
      <UserSettingsSection user={user} />
      <UserThemeSection />
    </>
  );
}
