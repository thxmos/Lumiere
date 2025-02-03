import { ScrollTextIcon } from "lucide-react";
import ProtectedLayout from "@/components/layouts/protected-layout";
import LayoutSidebar from "@/components/layouts/layout-sidebar";
import { EPK_TABS } from "./tabs";
import Navbar from "@/components/layouts/nav-bar";
import { validateAuthPage } from "@/utils/security/auth";
import { ScrollToTopLayout } from "./scroll-to-top.layout";
import { USER_ROLES } from "@/types/user-roles";

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
          path="epk"
          description="Show your accomplishments"
          userRole={user?.roles || USER_ROLES.USER}
          tabs={EPK_TABS}
          title="EPK Builder"
          headerIcon={<ScrollTextIcon />}
        />
        <main className="flex flex-col overflow-y-auto bg-background w-full gap-4 p-8 ml-64">
          <ScrollToTopLayout>{children}</ScrollToTopLayout>
        </main>
      </div>
    </ProtectedLayout>
  );
};

export default ForesightLayout;
