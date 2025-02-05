import { validateAuthPage } from "@/utils/security/auth";
import { ProfileInfoSection } from "./ProfileInfoSection";
import { getUserById } from "@/actions/entities/user/getUserById";

export default async function ProfilePage() {
  const user = await validateAuthPage();
  const userData = await getUserById(user.id);

  return (
    <>
      <ProfileInfoSection
        user={user}
        commitment={userData.commitment}
        strategyType={userData.strategyType}
      />
    </>
  );
}
