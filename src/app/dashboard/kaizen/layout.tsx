import { MailPlusIcon } from "lucide-react";
import ProtectedLayout from "@/components/layouts/protected-layout";
import LayoutSidebar from "@/components/layouts/layout-sidebar";
import { KAIZEN_TABS } from "./tabs";
import Navbar from "@/components/layouts/nav-bar";
import { validateAuthPage } from "@/utils/security/auth";
import { USER_ROLES } from "@/types/user-roles";
import { ScrollToTopLayout } from "../ulink/_components/scroll-to-top.layout";

interface Props {
  children: React.ReactNode;
}

const KaizenLayout: React.FC<Props> = async ({ children }) => {
  await validateAuthPage();

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      <main className="flex flex-col overflow-y-auto bg-background w-full gap-4 p-8">
        <ScrollToTopLayout>{children}</ScrollToTopLayout>
      </main>
    </div>
  );
};

export default KaizenLayout;
