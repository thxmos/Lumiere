import { BarcodeIcon } from "lucide-react";
import ProtectedLayout from "@/components/layouts/protected-layout";
import LayoutSidebar from "@/components/layouts/layout-sidebar";
import { EXCHANGE_TABS } from "./tabs";
import { USER_ROLES } from "@/types/user-roles";
import Navbar from "@/components/layouts/nav-bar";
import { validateAuthPage } from "@/utils/security/auth";
import { ScrollToTopLayout } from "@/components/layouts/scroll-to-top.layout";

interface Props {
  children: React.ReactNode;
}

const ExchangeLayout: React.FC<Props> = async ({ children }) => {
  const user = await validateAuthPage();

  const path = "exchange";
  const title = "Exchange";
  const description = "Sell your products";
  const headerIcon = <BarcodeIcon />;

  return (
    <ProtectedLayout redirectUrl="/auth">
      <Navbar />

      <div className="flex h-[calc(100vh-4rem)] bg-background">
        <LayoutSidebar
          path={path}
          userRole={user?.roles || USER_ROLES.USER}
          tabs={EXCHANGE_TABS}
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

export default ExchangeLayout;
