import MobilePreview from "@/app/dashboard/ulink/_components/mobile-preview/mobile-preview";
import LinkTree from "@/app/(ulink-profile)/components/profile/linktree";
import { getThemeAction } from "@/actions/entities/Theme/getTheme";
import { getLinksByUserId } from "@/actions/entities/Link/getLinksByUserId";
import type { UserDtoNoId } from "@/actions/entities/User/createUser";
import type { LinkDtoWithId } from "@/types/links";
import { validateAuthPage } from "@/utils/security/auth";
import { ScrollToTopLayout } from "@/components/layouts/scroll-to-top.layout";

interface Props {
  children: React.ReactNode;
}

const ULinkLayout: React.FC<Props> = async ({ children }) => {
  const user = await validateAuthPage();

  const theme = await getThemeAction();
  const links = await getLinksByUserId();

  console.log(links);

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

export default ULinkLayout;
