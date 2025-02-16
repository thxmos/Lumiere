import { validateAuthPage } from "@/utils/security/auth";
import { ScrollToTopLayout } from "@/modules/shared/components/layouts/scroll-to-top.layout";

interface Props {
  children: React.ReactNode;
}

const UserSettingsLayout: React.FC<Props> = async ({ children }) => {
  await validateAuthPage();

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      <main className="flex flex-col overflow-y-auto bg-background w-full gap-4 p-8">
        <ScrollToTopLayout>{children}</ScrollToTopLayout>
      </main>
    </div>
  );
};

export default UserSettingsLayout;
