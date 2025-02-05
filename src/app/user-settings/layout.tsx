import { UserIcon } from "lucide-react";
import ProtectedLayout from "@/components/layouts/protected-layout";
import LayoutSidebar from "@/components/layouts/layout-sidebar";
import { USER_SETTINGS_TABS } from "./tabs";
import { USER_ROLES } from "@/types/user-roles";
import Navbar from "@/components/layouts/nav-bar";
import { validateAuthPage } from "@/utils/security/auth";
import { ScrollToTopLayout } from "@/app/ulink/_components/scroll-to-top.layout";

interface Props {
  children: React.ReactNode;
}

const UserSettingsLayout: React.FC<Props> = async ({ children }) => {
  const user = await validateAuthPage();

  const path = "user-settings";
  const title = "User Settings";
  const description = "Manage your account";
  const headerIcon = <UserIcon />;

  return (
    <ProtectedLayout redirectUrl="/auth">
      <Navbar />

      <div className="flex h-[calc(100vh-4rem)] bg-background">
        <LayoutSidebar
          path={path}
          userRole={user?.roles || USER_ROLES.USER}
          tabs={USER_SETTINGS_TABS}
          title={title}
          description={description}
          headerIcon={headerIcon}
        />
        <main className="flex flex-col overflow-y-auto bg-background w-full gap-4 p-8 ml-64">
          <ScrollToTopLayout>{children}</ScrollToTopLayout>
        </main>
      </div>
    </ProtectedLayout>
  );
};

export default UserSettingsLayout;
