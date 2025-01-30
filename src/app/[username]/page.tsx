import { getUserByUsername } from "@/actions/entities/user/user";
import { getActiveLinksByUserId } from "../../actions/profile-page";
import { getThemeAction } from "@/actions/entities/theme";
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

  const links = await getActiveLinksByUserId(user.id);
  const theme = await getThemeAction(user.id);

  return (
    <LinkTree
      isPreview={searchParams.preview === "true"}
      initialLinks={links as LinkDtoWithId[]}
      initialTheme={theme}
      user={user}
    />
  );
}
