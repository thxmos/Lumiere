import { getLinkGroupsByUserId } from "@/actions/entities/Link/getLinkGroupsByUserId";
import LinkGroupGrid from "./link-group-grid";
import { validateAuthPage } from "@/utils/security/auth";

const LinkGroupsPage = async () => {
  const user = await validateAuthPage();
  const linkGroups = await getLinkGroupsByUserId();

  return (
    <div className="flex flex-col gap-4">
      <LinkGroupGrid linkGroups={linkGroups} user={user} />
    </div>
  );
};

export default LinkGroupsPage;
