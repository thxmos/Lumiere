import { getUserById } from "@/data-access/user";
import LinksTab from "./links-tab";
import { getUser } from "@/actions/session.actions";
import { getLinks } from "./links.actions";
import { getTheme } from "@/actions/theme.actions";
import { ThemesCard } from "./_components/themes-card";
import { ProfileInfoCard } from "./_components/profile-card";
import { SocialMediaCard } from "./_components/social-media-card";
import { LinksCard } from "./_components/links-card";

const LinksPage = async () => {
  const sessionUser = await getUser();
  const userId = sessionUser.user?.id;
  if (!userId) return null;
  const user = await getUserById(userId);
  const links = await getLinks(userId);
  const theme = await getTheme(userId);

  return (
    <div className="space-y-4 mb-16">
      <ProfileInfoCard user={user} />
      <LinksCard userLinks={links} userId={user.id} />
      <SocialMediaCard user={user} />
      <ThemesCard userId={user.id} initialTheme={theme} />
    </div>
  );
};

export default LinksPage;
