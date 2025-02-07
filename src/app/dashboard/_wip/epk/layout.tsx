import { ScrollToTopLayout } from "@/components/layouts/scroll-to-top.layout";
import { validateAuthPage } from "@/utils/security/auth";

interface Props {
  children: React.ReactNode;
}

const ForesightLayout: React.FC<Props> = async ({ children }) => {
  await validateAuthPage();

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      <main className="flex flex-col overflow-y-auto bg-background w-full gap-4 p-8 ml-64">
        <ScrollToTopLayout>{children}</ScrollToTopLayout>
      </main>
    </div>
  );
};

export default ForesightLayout;
