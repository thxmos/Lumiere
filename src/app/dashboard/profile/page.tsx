import { getCurrentUser } from "@/actions/entities/user/getCurrentUser";
import { AccountSection } from "./account.section";
import { SocialMediaSection } from "./social-media.section";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <>
      <AccountSection user={user} />
      <SocialMediaSection initialUser={user} />
    </>
  );
}
