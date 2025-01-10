"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { THEMES } from "@/constants";
import { useTheme } from "next-themes";
import { UserDto } from "@/data-access/user";
import { updateUser } from "./account.actions";
import { DashboardCard } from "@/components/dashboard-card/dashboard-card";
export default function AccountTab({ user }: { user: UserDto }) {
  const { theme, setTheme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const userId = formData.get("id") as string;
    const name = formData.get("name") as string;

    try {
      await updateUser(userId, { name });
      toast.success("Successfully updated user");
    } catch (error) {
      console.error(error);
      toast.error("Could not update user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 mb-16">
      <DashboardCard
        title="User Settings"
        description="Update your personal information and profile picture."
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

      <DashboardCard
        title="Preferences"
        description="Customize your experience by updating theme."
      >
        <div className="space-y-2">
          <Label>Theme</Label>
          <div className="flex flex-wrap gap-2">
            {THEMES.map((t) => (
              <button
                key={t.name}
                type="button"
                className={`w-8 h-8 rounded-md border-2 ${
                  t.name === theme ? "border-primary" : "border-transparent"
                }`}
                style={{ backgroundColor: t.color }}
                onClick={() => setTheme(t.name)}
                aria-label={`Select ${t.name} theme`}
              />
            ))}
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
