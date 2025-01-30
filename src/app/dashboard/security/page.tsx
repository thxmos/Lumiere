import { UserDto } from "@/actions/entities/user/user";
import { hasPasswordAction } from "@/actions/entities/user/user";
import SecuritySection from "./security.section";
import { validateAuthPage } from "@/utils/security/auth";

export default async function SecurityPage() {
  const user = await validateAuthPage();
  const hasPassword = await hasPasswordAction();

  return <SecuritySection user={user as UserDto} hasPassword={hasPassword} />;
}
