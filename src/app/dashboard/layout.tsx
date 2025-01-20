import { LayoutDashboard } from "lucide-react";
import ProtectedLayout from "@/components/protected-layout";
import LayoutSidebar from "@/components/layout-sidebar";
import { DASHBOARD_TABS } from "./tabs";
import Navbar from "@/components/nav-bar/nav-bar";
import { getUser } from "@/actions/session.actions";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  const tabs = DASHBOARD_TABS;

  return (
    <ProtectedLayout redirectUrl="/auth">
      <Navbar />

      <div className="flex h-screen bg-background">
        <LayoutSidebar
          tabs={tabs}
          title="Dashboard"
          headerIcon={<LayoutDashboard />}
        />
        <main className="flex-1 p-8 overflow-y-auto bg-background">
          <div className="w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
