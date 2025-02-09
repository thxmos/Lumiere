import { LinksSection } from "./links.section";
import { ThemeEditorSection } from "../(themes)/theme-editor.section";
import { LinkResponse } from "@/repositories/link/types";
import { ThemeResponse } from "@/repositories/theme/types";
import { AssetResponse } from "@/repositories/asset/types";
import SocialMediaSection from "../social-media.section";
import DescriptionSection from "../description.section";
import { UserResponse } from "@/repositories/user/types";
import { LinkGroupResponse } from "@/repositories/linkGroup/types";
import NewLinkGroupForm from "./new-link-group-form";

export default async function LinksEditorSections({
  linkGroup,
  user,
  links,
  theme,
  assets,
}: {
  linkGroup: LinkGroupResponse;
  user: UserResponse;
  links: LinkResponse[];
  theme: ThemeResponse;
  assets: AssetResponse[];
}) {
  if (!linkGroup) {
    return (
      <div className="flex flex-col gap-4">
        <p>No link groups found. Create a new one.</p>
        <NewLinkGroupForm user={user} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <DescriptionSection linkGroup={linkGroup} />
      <LinksSection userLinks={links} linkGroupId={linkGroup.id} />
      <SocialMediaSection linkGroup={linkGroup} />
      <ThemeEditorSection initialTheme={theme} assets={assets} />
    </div>
  );
}
