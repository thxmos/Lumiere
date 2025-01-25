import { LayoutDashboard } from "lucide-react";
import ProtectedLayout from "@/components/protected-layout";
import LayoutSidebar from "@/components/layout-sidebar";
import { DASHBOARD_TABS } from "./tabs";
import Navbar from "@/components/nav-bar/nav-bar";
import { ScrollToTopLayout } from "./scroll-to-top.layout";
import { getUser } from "@/actions/session.actions";
import { USER_ROLES } from "@/constants/user";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  const { user } = await getUser();
  const tabs = DASHBOARD_TABS;

  return (
    <ProtectedLayout redirectUrl="/auth">
      <Navbar />

      <div className="flex h-screen bg-background">
        <LayoutSidebar
          userRole={user?.roles || USER_ROLES.USER}
          tabs={tabs}
          title="Dashboard"
          headerIcon={<LayoutDashboard />}
        />
        <main className="flex flex-col overflow-y-auto bg-background mb-16 w-full gap-4 p-8">
          <ScrollToTopLayout>{children}</ScrollToTopLayout>
        </main>
      </div>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
