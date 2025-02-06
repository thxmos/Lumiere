import { validateAuthPage } from "@/utils/security/auth";
import { ProfileInfoSection } from "./ProfileInfoSection";
import { getUserById } from "@/actions/entities/user/getUserById";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import QuickStartCards from "./QuickStartCards";

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
      <div className="max-w-4xl">
        <QuickStartCards />
      </div>
    </>
  );
}
