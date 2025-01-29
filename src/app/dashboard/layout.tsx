import { LayoutDashboard } from "lucide-react";
import ProtectedLayout from "@/components/protected-layout";
import LayoutSidebar from "@/components/layout-sidebar";
import { DASHBOARD_TABS } from "./tabs";
import Navbar from "@/components/nav-bar/nav-bar";
import { ScrollToTopLayout } from "./scroll-to-top.layout";
import { getUser } from "@/actions/entities/session";
import { USER_ROLES } from "@/constants/user";
import MobilePreview from "@/components/mobile-preview/mobile-preview";
import LinkTree from "@/components/profile/linktree";
import { getThemeAction } from "@/actions/entities/theme";
import { getLinksByUserId } from "@/actions/entities/links";
import { UserDto } from "@/actions/entities/user";
import { LinkDtoWithId } from "@/types/links";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  const { user } = await getUser();
  const tabs = DASHBOARD_TABS;

  const theme = await getThemeAction(user?.id!);
  const links = await getLinksByUserId(user?.id!);

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
        <div className="min-w-[30%] h-full grid items-center">
          <MobilePreview username={user?.username!}>
            <LinkTree
              isPreview={true}
              initialLinks={links as LinkDtoWithId[]}
              initialTheme={theme}
              user={user as UserDto}
            />
          </MobilePreview>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
