import { Cable } from "lucide-react";
import ProtectedLayout from "@/components/layouts/protected-layout";
import LayoutSidebar from "@/components/layouts/layout-sidebar";
import { DASHBOARD_TABS } from "./tabs";
import { USER_ROLES } from "@/constants/user";
import MobilePreview from "@/app/ulink/_components/mobile-preview/mobile-preview";
import LinkTree from "@/app/(ulink-profile)/components/profile/linktree";
import { getThemeAction } from "@/actions/entities/theme/getTheme";
import { getLinksByUserId } from "@/actions/entities/link/getLinksByUserId";
import type { UserDtoNoId } from "@/actions/entities/user/createUser";
import { LinkDtoWithId } from "@/types/links";
import Navbar from "@/components/layouts/nav-bar";
import { validateAuthPage } from "@/utils/security/auth";
import { ScrollToTopLayout } from "@/app/ulink/_components/scroll-to-top.layout";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  const user = await validateAuthPage();

  const theme = await getThemeAction();
  const links = await getLinksByUserId();

  // TODO: was trying to integrate with user Store for real time updates in social media
  // const { id, ...userWithoutId } = user; // remove id from user object
  // const { user: storedUser, setUser } = useUserStore();

  // // For mobile preview
  // useEffect(() => {
  //   setUser(userWithoutId as UserDto); // set user in store
  // }, []);

  const path = "ulink";
  const title = "ULink";
  const description = "Connect with your audience";
  const headerIcon = <Cable />;

  return (
    <ProtectedLayout redirectUrl="/auth">
      <Navbar />

      <div className="flex h-[calc(100vh-4rem)] bg-background">
        <LayoutSidebar
          path={path}
          userRole={user?.roles || USER_ROLES.USER}
          tabs={DASHBOARD_TABS}
          title={title}
          description={description}
          headerIcon={headerIcon}
        />
        <main className="flex flex-col overflow-y-auto bg-background w-full gap-4 p-8 ml-64">
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
