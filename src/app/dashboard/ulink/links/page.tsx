import { getLinkGroupsByUserId } from "@ulink/actions/link/getLinkGroupsByUserId";
import { getAssetsByUserId } from "@actions/entities/asset/getAssetsByUserId";
import LinkGroupGrid from "@ulink/components/link-group/link-group-grid";

const LinkGroupsPage = async () => {
  const assets = await getAssetsByUserId();
  const linkGroups = await getLinkGroupsByUserId();

  return (
    <div className="flex flex-col gap-4">
      <LinkGroupGrid linkGroups={linkGroups} assets={assets}></LinkGroupGrid>
    </div>
  );
};

export default LinkGroupsPage;
