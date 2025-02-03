import { ScanEyeIcon } from "lucide-react";
import ProtectedLayout from "@/components/layouts/protected-layout";
import LayoutSidebar from "@/components/layouts/layout-sidebar";
import { FORESIGHT_TABS } from "./tabs";
import { USER_ROLES } from "@/constants/user";
import Navbar from "@/components/layouts/nav-bar";
import { validateAuthPage } from "@/utils/security/auth";
import { ScrollToTopLayout } from "@/app/ulink/_components/scroll-to-top.layout";

interface Props {
  children: React.ReactNode;
}

const ForesightLayout: React.FC<Props> = async ({ children }) => {
  const user = await validateAuthPage();

  return (
    <ProtectedLayout redirectUrl="/auth">
      <Navbar />

      <div className="flex h-[calc(100vh-4rem)] bg-background">
        <LayoutSidebar
          path="foresight"
          userRole={user?.roles || USER_ROLES.USER}
          tabs={FORESIGHT_TABS}
          title="Foresight"
          headerIcon={<ScanEyeIcon />}
        />
        <main className="flex flex-col overflow-y-auto bg-background w-full gap-4 p-8 ml-64">
          <ScrollToTopLayout>{children}</ScrollToTopLayout>
        </main>
      </div>
    </ProtectedLayout>
  );
};

export default ForesightLayout;
