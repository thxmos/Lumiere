import { getLinkGroupsByUserId } from "@/actions/entities/link/getLinkGroupsByUserId";
import LinkGroupGrid from "./components/link-group-grid";

const LinkGroupsPage = async () => {
  const linkGroups = await getLinkGroupsByUserId();

  return (
    <div className="flex flex-col gap-4">
      <LinkGroupGrid linkGroups={linkGroups} />
    </div>
  );
};

export default LinkGroupsPage;
