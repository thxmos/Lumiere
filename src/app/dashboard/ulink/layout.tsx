import MobilePreview from "@/app/dashboard/ulink/_components/mobile-preview/mobile-preview";
import LinkTree from "@/app/(ulink-profile)/components/profile/linktree";
import { getThemeAction } from "@/actions/entities/Theme/getTheme";
import { getLinksByUserId } from "@/actions/entities/Link/getLinksByUserId";
import type { LinkDtoWithId } from "@/types/links";
import { ScrollToTopLayout } from "@/components/layouts/scroll-to-top.layout";
import { getUserById } from "@/actions/entities/User/getUserById";

interface Props {
  children: React.ReactNode;
}

const ULinkLayout: React.FC<Props> = async ({ children }) => {
  const user = await getUserById();
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
      <main className="flex flex-col overflow-y-auto bg-background w-full gap-4">
        <ScrollToTopLayout>{children}</ScrollToTopLayout>
      </main>
      <aside className="sticky top-0 flex items-center h-[calc(100vh-100px)] px-32">
        <MobilePreview username={user?.username!}>
          <LinkTree
            isPreview={true}
            isMobilePreview={true}
            initialLinks={links as LinkDtoWithId[]}
            initialTheme={theme}
            user={user}
          />
        </MobilePreview>
      </aside>
    </div>
  );
};

export default ULinkLayout;
