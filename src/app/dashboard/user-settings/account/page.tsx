import UserSettingsSection from "./user-settings.section";
import { UserThemeSection } from "./user-theme.section";
import { validateAuthPage } from "@/utils/security/auth";

export default async function UserSettingsPage() {
  const user = await validateAuthPage();

  return (
    <>
      <UserSettingsSection user={user} />
      <UserThemeSection />
    </>
  );
}
