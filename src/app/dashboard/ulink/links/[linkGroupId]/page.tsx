import { LinksSection } from "./links.section";
import { validateAuthPage } from "@/utils/security/auth";
import { getLinksByGroupId } from "@/actions/entities/Link/getLinksByGroupId";
import { SocialMediaSection } from "./social-media.section";

export default async function LinksPage({
  params,
}: {
  params: { linkGroupId: string };
}) {
  const user = await validateAuthPage();
  const links = await getLinksByGroupId(params.linkGroupId);

  return (
    <>
      <LinksSection
        userLinks={links}
        user={user}
        linkGroupId={params.linkGroupId}
      />
      <SocialMediaSection initialUser={user} />
    </>
  );
}
