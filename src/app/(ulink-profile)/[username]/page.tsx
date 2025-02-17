import { getUserByUsername } from "@/shared/actions/entities/user/getUserByUsername";
import { getActiveLinkGroupByUsername } from "@/modules/uLink/actions/link/getActiveLinkGroupByUsername";
import { getThemeByUsername } from "@/modules/uLink/actions/theme/getThemeByUsername";
import React from "react";
import { redirect } from "next/navigation";
import LinkTree from "@/shared/components/ulink-profile/linktree";
import { createProfileView } from "@/shared/actions/ulink/profile-view/createProfileView";
import { UserResponse } from "@/shared/core/db/repositories/user";

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
