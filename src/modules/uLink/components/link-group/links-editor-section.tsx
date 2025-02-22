import DescriptionSection from "@/app/dashboard/ulink/links/description.section";
import { AssetResponse } from "@core/db/repositories/asset/types";
import { ThemeEditorSection } from "../themes/theme-editor.section";
import { LinksSection } from "./links.section";
import { LinkGroupWithLinksTheme } from "@core/db/repositories/linkGroup/types";
import SocialMediaSection from "@/app/dashboard/ulink/links/social-media.section";
import DeleteGroupSection from "@/app/dashboard/ulink/links/delete-group.section";

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
      <DeleteGroupSection linkGroupId={linkGroup.id} />
    </div>
  );
}
