import { ProfileInfoSection } from "./ProfileInfoSection";
import { getUserById } from "@/actions/entities/User/getUserById";
import QuickStartCards from "./QuickStartCards";

export default async function ProfilePage() {
  const user = await getUserById();

  return (
    <>
      <ProfileInfoSection user={user} />
      <div className="max-w-4xl">
        <QuickStartCards />
      </div>
    </>
  );
}
