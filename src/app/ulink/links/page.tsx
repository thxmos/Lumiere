import { getLinksWithNumOfClicks } from "@/actions/entities/link/getLinksWithNumOfClicks";
import { SocialMediaSection } from "./social-media.section";
import { LinksSection } from "./links.section";
import { validateAuthPage } from "@/utils/security/auth";

export default async function LinksPage() {
  const user = await validateAuthPage();
  const links = await getLinksWithNumOfClicks(user.id);

  return (
    <>
      <LinksSection userLinks={links} user={user} />
      <SocialMediaSection initialUser={user} />
    </>
  );
}
