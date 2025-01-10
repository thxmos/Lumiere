"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileUpload, { FileType } from "@/components/file-upload";
import { updateUser } from "./account.actions";
import { getInitials } from "@/helpers";
import { THEMES } from "@/constants";
import { useTheme } from "next-themes";
import { UserDto } from "@/data-access/user";
import { uploadAvatar } from "@/components/avatar-upload/actions";

export default function AccountTab({ user }: { user: UserDto }) {
  const { theme, setTheme } = useTheme();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <CardHeader>
            <CardTitle className="text-2xl">User Settings</CardTitle>
            <CardDescription>
              Update your personal information and profile picture.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user?.email} //todo: fix get prop
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
          </CardContent>
        </form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Preferences</CardTitle>
          <CardDescription>
            Customize your experience by updating theme.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
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
        </CardContent>
        <Button type="submit" className="max-w-56" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </Card>
    </div>
  );
}
