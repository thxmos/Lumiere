"use client";

import React from "react";
import { UserDto } from "@/actions/entities/user/createUser";
import PasswordResetForm from "./password-reset-form";
import PasswordResetFormOAuth from "./password-reset-form-oAuth";
import { DashboardCard } from "@/components/layout/dashboard-card";

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
