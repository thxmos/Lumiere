import { getUserByUsername } from "@/actions/entities/user/getUserByUsername";
import { getActiveLinksByUsername } from "@/actions/entities/link/getActiveLinksByUsername";
import { getThemeByUsername } from "@/actions/entities/theme/getThemeByUsername";
import React from "react";
import { redirect } from "next/navigation";
import LinkTree from "@/app/(ulink-profile)/components/profile/linktree";
import { LinkDtoWithId } from "@/types/links";
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

  const links = await getActiveLinksByUsername(user.username);
  const theme = await getThemeByUsername(user.username);
  if (searchParams.preview !== "true") {
    await createProfileView(user.username);
  }

  return (
    <LinkTree
      isPreview={searchParams.preview === "true"}
      initialLinks={links as LinkDtoWithId[]}
      initialTheme={theme}
      user={user as UserResponse}
    />
  );
}
