import { UserDto } from "@/shared/actions/entities/user/createUser";
import { hasPasswordAction } from "@/shared/actions/entities/user/hasPassword";
import SecuritySection from "./security.section";
import { validateAuthPage } from "@/shared/utils/security/auth";

export default async function SecurityPage() {
  const user = await validateAuthPage();
  const hasPassword = await hasPasswordAction();

  return <SecuritySection user={user as UserDto} hasPassword={hasPassword} />;
}
