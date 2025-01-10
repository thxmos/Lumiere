"use client";

import React from "react";
import { UserDto } from "@/data-access/user";
import PasswordResetForm from "./password-reset-form";
import PasswordResetFormOAuth from "./password-reset-form-oAuth";
import { DashboardCard } from "@/components/dashboard-card/dashboard-card";

export default function SecurityTab({
  user,
  hasPassword,
}: {
  user: UserDto;
  hasPassword: boolean;
}) {
  if (user.oAuthProvider && !hasPassword) {
    return <PasswordResetFormOAuth user={user} />;
  }

  return (
    <DashboardCard
      title="Security Settings"
      description="Manage your account's security."
    >
      <PasswordResetForm user={user} />
    </DashboardCard>
  );
}
