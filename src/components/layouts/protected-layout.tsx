import React from "react";
import { redirect } from "next/navigation";
import { validateAuthPage } from "@/utils/security/auth";

interface Props {
  children: React.ReactNode;
  redirectUrl?: string;
}

// TODO: Should we use protected layout? I'm pretty sure it's not working as intended
// I think the layout isn't re-rendering so it's not checking auth properly
// I might be wrong. Remove a validateAuthPage action and see if it works
const ProtectedLayout: React.FC<Props> = async ({ children, redirectUrl }) => {
  const user = validateAuthPage();

  if (!user) {
    redirect(redirectUrl ?? "/");
  }

  return <>{children}</>;
};

export default ProtectedLayout;
