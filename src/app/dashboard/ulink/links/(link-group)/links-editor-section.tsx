import { LinksSection } from "./links.section";
import { ThemeEditorSection } from "../(themes)/theme-editor.section";
import { AssetResponse } from "@/shared/core/db/repositories/asset/types";
import SocialMediaSection from "../social-media.section";
import DescriptionSection from "../description.section";
import { LinkGroupWithLinksTheme } from "@/shared/core/db/repositories/linkGroup/types";

export default async function LinksEditorSections({
  linkGroup,
  assets,
}: {
  linkGroup: LinkGroupWithLinksTheme;
  assets: AssetResponse[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <DescriptionSection linkGroup={linkGroup} />
      <LinksSection userLinks={linkGroup.Links} linkGroupId={linkGroup.id} />
      <SocialMediaSection linkGroup={linkGroup} />
      <ThemeEditorSection initialTheme={linkGroup.Theme} assets={assets} />
    </div>
  );
}
