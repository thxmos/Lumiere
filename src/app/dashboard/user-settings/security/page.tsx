import { UserDto } from "@/actions/entities/user/createUser";
import { hasPasswordAction } from "@/actions/entities/user/hasPassword";
import SecuritySection from "./security.section";
import { validateAuthPage } from "@/utils/security/auth";

export default async function SecurityPage() {
  const user = await validateAuthPage();
  const hasPassword = await hasPasswordAction();

  return <SecuritySection user={user as UserDto} hasPassword={hasPassword} />;
}
