import { getUserById } from "@/actions/entities/User/getUserById";
import { AccountSection } from "./account.section";
import { SocialMediaSection } from "./social-media.section";

export default async function ProfilePage() {
  const user = await getUserById();

  return (
    <>
      <AccountSection user={user} />
      <SocialMediaSection initialUser={user} />
    </>
  );
}
