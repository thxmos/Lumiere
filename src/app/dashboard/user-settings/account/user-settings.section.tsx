"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardCard } from "@/components/layouts/dashboard-card";
import { updateUserById } from "@/actions/entities/user/updateUserById";
import { UserResponse } from "@/repositories/user";

export default function UserSettingsSection({ user }: { user: UserResponse }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    try {
      await updateUserById(user.id, { name });
      toast.success("Successfully updated user", {
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Could not update user", {
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardCard
      title="User Settings"
      description="Update your personal information here."
    >
      <form
        id="user-settings-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={user?.email}
              disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={user?.name!}
              placeholder="Enter your name"
              required
            />
          </div>
        </div>
        <input type="hidden" name="id" value={user?.id} />
        <div className="flex justify-end w-full">
          <Button
            type="submit"
            form="user-settings-form"
            className="max-w-56"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </DashboardCard>
  );
}
