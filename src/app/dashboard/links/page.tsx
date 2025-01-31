import { getLinksWithNumOfClicks } from "@/actions/entities/link/getLinksWithNumOfClicks";
import { SocialMediaSection } from "./social-media.section";
import { LinksSection } from "./links.section";
import { validateAuthPage } from "@/utils/security/auth";

const LinksPage = async () => {
  const user = await validateAuthPage();
  const links = await getLinksWithNumOfClicks(user.id);

  return (
    <>
      <LinksSection userLinks={links} user={user} />
      <SocialMediaSection initialUser={user} />
    </>
  );
};

export default LinksPage;
