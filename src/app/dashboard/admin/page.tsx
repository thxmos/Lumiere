import { InviteSection } from "./invite.section";
import { WorkbenchSection } from "./workbench.section";

const AdminPage = async () => {
  return (
    <>
      <InviteSection />
      <WorkbenchSection />
    </>
  );
};

export default AdminPage;
