import { getUserByUsername } from "@/actions/user.actions";
import { getActiveLinksByUserId } from "./actions";
import { getTheme } from "@/actions/theme.actions";
import React from "react";
import { redirect } from "next/navigation";
import LinkTree from "@/components/profile/linktree";

export default async function ArtistPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);
  if (!user) {
    return redirect("/404");
  }

  const links = await getActiveLinksByUserId(user.id);
  const theme = await getTheme(user.id);

  return (
    <LinkTree
      isPreview={false}
      initialLinks={links}
      initialTheme={theme}
      user={user}
    />
  );
}
