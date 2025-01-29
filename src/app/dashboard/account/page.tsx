import { getUser } from "@/actions/session";
import { getUserById } from "@/data-access/user";
import { AccountSection } from "./account.section";
import { validateServerSession } from "@/utils/security/auth";

export default async function AccountSettingsPage() {
  const user = await validateServerSession();

  return (
    <>
      <AccountSection user={user} />
    </>
  );
}
