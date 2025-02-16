import { getLinkGroupsByUserId } from "@/shared/actions/entities/link/getLinkGroupsByUserId";
import LinkGroupGrid from "./link-group-grid";
import { getAssetsByUserId } from "@/shared/actions/entities/asset/getAssetsByUserId";
import { getThemeAction } from "@/shared/actions/entities/theme/getTheme";
import { getLinksByUserId } from "@/shared/actions/entities/link/getLinksByUserId";

const LinkGroupsPage = async () => {
  const assets = await getAssetsByUserId();
  const links = await getLinksByUserId();
  const linkGroups = await getLinkGroupsByUserId();
  const theme = await getThemeAction(); //TODO get by linkgroup

  return (
    <div className="flex flex-col gap-4">
      <LinkGroupGrid linkGroups={linkGroups} assets={assets}></LinkGroupGrid>
    </div>
  );
};

export default LinkGroupsPage;
