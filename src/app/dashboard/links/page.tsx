import { getUserById } from "@/data-access/user";
import { getUser } from "@/actions/session.actions";
import { getLinks } from "./links-card.actions";
import { SocialMediaCard } from "./social-media-card";
import { LinksCard } from "./links-card";

const LinksPage = async () => {
  const sessionUser = await getUser();
  const userId = sessionUser.user?.id;
  if (!userId) return null;
  const user = await getUserById(userId);
  const links = await getLinks(userId);

  return (
    <>
      <LinksCard userLinks={links} userId={user.id} />
      <SocialMediaCard user={user} />
    </>
  );
};

export default LinksPage;
