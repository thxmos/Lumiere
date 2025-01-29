import { AccountSection } from "./account.section";
import { validateAuthPage } from "@/utils/security/auth";

export default async function AccountSettingsPage() {
  const user = await validateAuthPage();

  return (
    <>
      <AccountSection user={user} />
    </>
  );
}
