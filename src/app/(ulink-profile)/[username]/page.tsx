import { getUserByUsername } from "@/actions/entities/User/getUserByUsername";
import { getActiveLinksByUsername } from "@/actions/entities/Link/getActiveLinksByUsername";
import { getThemeByUsername } from "@/actions/entities/Theme/getTheme";
import React from "react";
import { redirect } from "next/navigation";
import LinkTree from "@/app/(ulink-profile)/components/profile/linktree";
import { LinkDtoWithId } from "@/types/links";
import { UserDtoNoId } from "@/actions/entities/User/createUser";

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
