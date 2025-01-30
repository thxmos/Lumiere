import { getUserByUsername, UserDtoNoId } from "@/actions/entities/user/user";
import { getActiveLinksByUsername } from "@/actions/profile-page";
import { getThemeByUsername } from "@/actions/entities/theme/getTheme";
import React from "react";
import { redirect } from "next/navigation";
import LinkTree from "@/components/profile/linktree";
import { LinkDtoWithId } from "@/types/links";

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

  return (
    <LinkTree
      isPreview={searchParams.preview === "true"}
      initialLinks={links as LinkDtoWithId[]}
      initialTheme={theme}
      user={user as UserDtoNoId}
    />
  );
}
