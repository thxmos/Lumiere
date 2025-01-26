"use client";

import React from "react";
import { UserDto } from "@/data-access/user";
import PasswordResetForm from "./password-reset-form";
import PasswordResetFormOAuth from "./password-reset-form-oAuth";
import { DashboardCard } from "@/components/dashboard-card";

export default function SecuritySection({
  user,
  hasPassword,
}: {
  user: UserDto;
  hasPassword: boolean;
}) {
  return (
    <DashboardCard
      title="Security Settings"
      description="Manage your account's security."
    >
      {user.oAuthProvider && !hasPassword ? (
        <PasswordResetFormOAuth user={user} />
      ) : (
        <PasswordResetForm user={user} />
      )}
    </DashboardCard>
  );
}
