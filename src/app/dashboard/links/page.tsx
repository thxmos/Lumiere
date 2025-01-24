import { getUserById } from "@/data-access/user";
import { getUser } from "@/actions/session.actions";
import { getLinks } from "./links-card.actions";
import { SocialMediaSection } from "./social-media.section";
import { LinksSection } from "./links.section";

const LinksPage = async () => {
  const sessionUser = await getUser();
  const userId = sessionUser.user?.id;
  if (!userId) return null;
  const user = await getUserById(userId);
  const links = await getLinks(userId);

  return (
    <>
      <LinksSection userLinks={links} user={user} />
      <SocialMediaSection user={user} />
    </>
  );
};

export default LinksPage;
