import { getLinkGroupsByUserId } from "@/actions/entities/link/getLinkGroupsByUserId";
import LinkGroupForm from "./link-group-form";
import LinkGroupGrid from "../_components/link-group-grid";

const LinkGroupsPage = async () => {
  const linkGroups = await getLinkGroupsByUserId();

  return (
    <div className="flex flex-col gap-4">
      <LinkGroupGrid linkGroups={linkGroups} />
      <LinkGroupForm />
    </div>
  );
};

export default LinkGroupsPage;
