import { getLinkGroupsByUserId } from "@ulink/actions/link/getLinkGroupsByUserId";
import { getAssetsByUserId } from "@actions/entities/asset/getAssetsByUserId";
import { getThemeAction } from "@ulink/actions/theme/getTheme";
import { getLinksByUserId } from "@ulink/actions/link/getLinksByUserId";
import LinkGroupGrid from "@ulink/components/link-group/link-group-grid";

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
