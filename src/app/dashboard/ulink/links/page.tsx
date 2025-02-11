import { getLinkGroupsByUserId } from "@/actions/entities/link/getLinkGroupsByUserId";
import LinkGroupGrid from "./link-group-grid";
import { getAssetsByUserId } from "@/actions/entities/asset/getAssetsByUserId";
import { getThemeAction } from "@/actions/entities/theme/getTheme";
import { getLinksByUserId } from "@/actions/entities/link/getLinksByUserId";

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
