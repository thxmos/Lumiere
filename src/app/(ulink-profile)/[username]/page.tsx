import { getUserByUsername } from "@actions/entities/user/getUserByUsername";
import React from "react";
import { redirect } from "next/navigation";
import LinkTree from "@/modules/uLink/components/profile-page/profile-page";
import { UserResponse } from "@core/db/repositories/user";
import { getActiveLinkGroupByUsername } from "@ulink/actions/link/getActiveLinkGroupByUsername";
import { getThemeByUsername } from "@ulink/actions/theme/getThemeByUsername";
import { createProfileView } from "@ulink/actions/profile-view/createProfileView";
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
