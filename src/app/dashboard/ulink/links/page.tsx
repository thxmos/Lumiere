import { getLinkGroupsByUserId } from "@/actions/entities/link/getLinkGroupsByUserId";
import LinkGroupGrid from "./link-group-grid";
import { getAssetsByUserId } from "@/actions/entities/asset/getAssetsByUserId";
import { getThemeAction } from "@/actions/entities/theme/getTheme";
import { getLinksByUserId } from "@/actions/entities/link/getLinksByUserId";
import { getUserById } from "@/actions/entities/user/getUserById";

const LinkGroupsPage = async () => {
  const theme = await getThemeAction();
  const assets = await getAssetsByUserId();
  const links = await getLinksByUserId();
  const linkGroups = await getLinkGroupsByUserId();

  return (
    <div className="flex flex-col gap-4">
      <LinkGroupGrid
        linkGroups={linkGroups}
        links={links}
        theme={theme}
        assets={assets}
      ></LinkGroupGrid>
    </div>
  );
};

export default LinkGroupsPage;
