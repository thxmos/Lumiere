import { ProfileInfoSection } from "./ProfileInfoSection";
import { getCurrentUser } from "@/shared/actions/entities/user/getCurrentUser";
import QuickStartCards from "./QuickStartCards";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <>
      <ProfileInfoSection user={user} />
      <div className="max-w-4xl">
        <QuickStartCards />
      </div>
    </>
  );
}
