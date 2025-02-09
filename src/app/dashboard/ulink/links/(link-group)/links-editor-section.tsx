import { LinksSection } from "./links.section";
import { ThemeEditorSection } from "../(themes)/theme-editor.section";
import { LinkResponse } from "@/repositories/link/types";
import { ThemeResponse } from "@/repositories/theme/types";
import { AssetResponse } from "@/repositories/asset/types";
import SocialMediaSection from "../social-media.section";
import DescriptionSection from "../description.section";

export default async function LinksEditorSections({
  linkGroupId,
  links,
  theme,
  assets,
}: {
  linkGroupId: string;
  links: LinkResponse[];
  theme: ThemeResponse;
  assets: AssetResponse[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <DescriptionSection />
      <LinksSection userLinks={links} linkGroupId={linkGroupId} />
      <SocialMediaSection />
      <ThemeEditorSection initialTheme={theme} assets={assets} />
    </div>
  );
}
