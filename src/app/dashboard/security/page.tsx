import { UserDto } from "@/data-access/user";
import { hasPasswordAction } from "./actions";
import SecuritySection from "./security.section";
import { getUser } from "@/actions/session";

export default async function SecurityPage() {
  const { user } = await getUser();
  if (!user) return null;
  const hasPassword = await hasPasswordAction();

  return <SecuritySection user={user as UserDto} hasPassword={hasPassword} />;
}
