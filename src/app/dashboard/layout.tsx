import { LayoutDashboard } from "lucide-react";
import ProtectedLayout from "@/components/protected-layout";
import LayoutSidebar from "@/components/layout-sidebar";
import { DASHBOARD_TABS } from "./tabs";
import Navbar from "@/components/nav-bar/nav-bar";
import { ScrollToTopLayout } from "./scroll-to-top.layout";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  const tabs = DASHBOARD_TABS;

  return (
    <ProtectedLayout redirectUrl="/auth">
      <ScrollToTopLayout>
        <Navbar />

        <div className="flex h-screen bg-background">
          <LayoutSidebar
            tabs={tabs}
            title="Dashboard"
            headerIcon={<LayoutDashboard />}
          />
          <main className="flex flex-col overflow-y-auto bg-background mb-16 w-full max-w-5xl gap-4 p-8">
            {children}
          </main>
        </div>
      </ScrollToTopLayout>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
