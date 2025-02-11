import { LinksSection } from "./links.section";
import { ThemeEditorSection } from "../(themes)/theme-editor.section";
import { LinkResponse } from "@/repositories/link/types";
import { ThemeResponse } from "@/repositories/theme/types";
import { AssetResponse } from "@/repositories/asset/types";
import SocialMediaSection from "../social-media.section";
import DescriptionSection from "../description.section";
import { LinkGroupResponse } from "@/repositories/linkGroup/types";

export default async function LinksEditorSections({
  linkGroup,
  links,
  theme,
  assets,
}: {
  linkGroup: LinkGroupResponse;
  links: LinkResponse[];
  theme: ThemeResponse;
  assets: AssetResponse[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <DescriptionSection linkGroup={linkGroup} />
      <LinksSection userLinks={links} linkGroupId={linkGroup.id} />
      <SocialMediaSection linkGroup={linkGroup} />
      <ThemeEditorSection initialTheme={theme} assets={assets} />
    </div>
  );
}
