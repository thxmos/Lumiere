import { Cable } from "lucide-react";
import ProtectedLayout from "@/components/layouts/protected-layout";
import LayoutSidebar from "@/components/layouts/layout-sidebar";
import { ULINK_TABS } from "./tabs";
import { USER_ROLES } from "@/types/user-roles";
import MobilePreview from "@/app/dashboard/ulink/_components/mobile-preview/mobile-preview";
import LinkTree from "@/app/(ulink-profile)/components/profile/linktree";
import { getThemeAction } from "@/actions/entities/theme/getTheme";
import { getLinksByUserId } from "@/actions/entities/link/getLinksByUserId";
import type { UserDtoNoId } from "@/actions/entities/user/createUser";
import { LinkDtoWithId } from "@/types/links";
import Navbar from "@/components/layouts/nav-bar";
import { validateAuthPage } from "@/utils/security/auth";
import { ScrollToTopLayout } from "@/app/dashboard/ulink/_components/scroll-to-top.layout";

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

  return (
    <div className="flex bg-background">
      <main className="flex flex-col overflow-y-auto bg-background w-full gap-4 p-8">
        <ScrollToTopLayout>{children}</ScrollToTopLayout>
      </main>
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
  );
};

export default DashboardLayout;
