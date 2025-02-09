import { getUserByUsername } from "@/actions/entities/user/getUserByUsername";
import { getActiveLinkGroupByUsername } from "@/actions/entities/link/getActiveLinkGroupByUsername";
import { getThemeByUsername } from "@/actions/entities/theme/getThemeByUsername";
import React from "react";
import { redirect } from "next/navigation";
import LinkTree from "@/app/(ulink-profile)/components/profile/linktree";
import { createProfileView } from "@/actions/entities/profile-view/createProfileView";
import { UserResponse } from "@/repositories/user";

export default async function ArtistPage({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { preview: string };
}) {
  const user = await getUserByUsername(params.username);
  if (!user) {
    return redirect("/404");
  }

  const linkGroup = await getActiveLinkGroupByUsername(user.username);
  if (!linkGroup) {
    return redirect("/404");
  }

  const theme = await getThemeByUsername(user.username);
  // TODO: else load default theme
  // TODO: theme relation to link group

  if (searchParams.preview !== "true") {
    await createProfileView(user.username);
  }

  return (
    <LinkTree
      isPreview={searchParams.preview === "true"}
      initialLinkGroup={linkGroup}
      initialTheme={theme}
      user={user as UserResponse}
    />
  );
}
