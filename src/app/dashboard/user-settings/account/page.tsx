import { getCurrentUser } from "@/shared/actions/entities/user/getCurrentUser";
import UserSettingsSection from "./user-settings.section";
import { UserThemeSection } from "./user-theme.section";
import { validateAuthPage } from "@/utils/security/auth";

export default async function UserSettingsPage() {
  await validateAuthPage();
  const userResponse = await getCurrentUser();

  return (
    <>
      <UserSettingsSection user={userResponse} />
      <UserThemeSection />
    </>
  );
}
