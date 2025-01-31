import { LayoutDashboard } from "lucide-react";
import ProtectedLayout from "@/components/layout/protected-layout";
import LayoutSidebar from "@/components/layout/layout-sidebar";
import { DASHBOARD_TABS } from "./tabs";
import { ScrollToTopLayout } from "./scroll-to-top.layout";
import { USER_ROLES } from "@/constants/user";
import MobilePreview from "@/components/mobile-preview/mobile-preview";
import LinkTree from "@/components/profile/linktree";
import { getThemeAction } from "@/actions/entities/theme/getTheme";
import { getLinksByUserId } from "@/actions/entities/link/getLinksByUserId";
import type { UserDtoNoId } from "@/actions/entities/user/createUser";
import { LinkDtoWithId } from "@/types/links";
import Navbar from "@/components/layout/nav-bar";
import { validateAuthPage } from "@/utils/security/auth";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  const user = await validateAuthPage();

  const theme = await getThemeAction(user?.id!);
  const links = await getLinksByUserId(user?.id!);

  // const { id, ...userWithoutId } = user; // remove id from user object
  // const { user: storedUser, setUser } = useUserStore();

  // // For mobile preview
  // useEffect(() => {
  //   setUser(userWithoutId as UserDto); // set user in store
  // }, []);

  return (
    <ProtectedLayout redirectUrl="/auth">
      <Navbar />

      <div className="flex h-screen bg-background">
        <LayoutSidebar
          userRole={user?.roles || USER_ROLES.USER}
          tabs={DASHBOARD_TABS}
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
              isMobilePreview={true}
              initialLinks={links as LinkDtoWithId[]}
              initialTheme={theme}
              user={user as UserDtoNoId}
            />
          </MobilePreview>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
