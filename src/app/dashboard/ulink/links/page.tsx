import { getLinkGroupsByUserId } from "@/actions/entities/Link/getLinkGroupsByUserId";
import LinkGroupGrid from "./link-group-grid";
import { validateAuthPage } from "@/utils/security/auth";
import { getAssetsByUserId } from "@/actions/entities/Asset/getAssetsByUserId";
import { getThemeAction } from "@/actions/entities/Theme/getTheme";
import { getLinksByUserId } from "@/actions/entities/Link/getLinksByUserId";
import { getUserById } from "@/actions/entities/User/getUserById";

const LinkGroupsPage = async () => {
  const user = await getUserById();
  const theme = await getThemeAction();
  const assets = await getAssetsByUserId();
  const links = await getLinksByUserId();
  const linkGroups = await getLinkGroupsByUserId();

  return (
    <div className="flex flex-col gap-4">
      <LinkGroupGrid
        linkGroups={linkGroups}
        links={links}
        user={user}
        theme={theme}
        assets={assets}
      ></LinkGroupGrid>
    </div>
  );
};

export default LinkGroupsPage;
