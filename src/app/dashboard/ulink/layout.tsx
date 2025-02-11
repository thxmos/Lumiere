import MobilePreview from "@/app/dashboard/ulink/_components/mobile-preview/mobile-preview";
import LinkTree from "@/app/(ulink-profile)/components/profile/linktree";
import { getThemeAction } from "@/actions/entities/theme/getTheme";
import { ScrollToTopLayout } from "@/components/layouts/scroll-to-top.layout";
import { getCurrentUser } from "@/actions/entities/user/getCurrentUser";
import { getActiveLinkGroupByUsername } from "@/actions/entities/link/getActiveLinkGroupByUsername";

interface Props {
  children: React.ReactNode;
}

const ULinkLayout: React.FC<Props> = async ({ children }) => {
  const user = await getCurrentUser();
  const theme = await getThemeAction();
  const linkGroup = await getActiveLinkGroupByUsername(user?.username!);

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
            initialLinkGroup={linkGroup}
            initialTheme={theme}
            user={user}
          />
        </MobilePreview>
      </aside>
    </div>
  );
};

export default ULinkLayout;
