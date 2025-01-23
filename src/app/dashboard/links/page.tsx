import { getUserById } from "@/data-access/user";
import { getUser } from "@/actions/session.actions";
import { getLinks } from "./links-card.actions";
import { getTheme } from "@/actions/theme.actions";
import { ThemesCard } from "./themes-card";
import { ProfileInfoCard } from "./profile-card";
import { SocialMediaCard } from "./social-media-card";
import { LinksCard } from "./links-card";

const LinksPage = async () => {
  const sessionUser = await getUser();
  const userId = sessionUser.user?.id;
  if (!userId) return null;
  const user = await getUserById(userId);
  const links = await getLinks(userId);
  const theme = await getTheme(userId);

  return (
    <div className="space-y-4">
      <ProfileInfoCard user={user} />
      <LinksCard userLinks={links} userId={user.id} />
      <SocialMediaCard user={user} />
      <ThemesCard userId={user.id} initialTheme={theme} />
    </div>
  );
};

export default LinksPage;
