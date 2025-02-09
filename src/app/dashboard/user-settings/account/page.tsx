import { getUserById } from "@/actions/entities/user/getUserById";
import UserSettingsSection from "./user-settings.section";
import { UserThemeSection } from "./user-theme.section";
import { validateAuthPage } from "@/utils/security/auth";

export default async function UserSettingsPage() {
  const user = await validateAuthPage();
  const userResponse = await getUserById();

  return (
    <>
      <UserSettingsSection user={userResponse} />
      <UserThemeSection />
    </>
  );
}
