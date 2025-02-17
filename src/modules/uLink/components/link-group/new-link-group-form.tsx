"use client";

import React, { useState } from "react";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { createLinkGroup } from "@/modules/uLink/actions/link/createLinkGroup";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useRouter } from "next/navigation";
import { Card } from "@/shared/components/ui/card";
import { UserResponse } from "@/shared/core/db/repositories/user";

const NewLinkGroupForm = ({ user }: { user: UserResponse }) => {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (title.length === 0) {
        toast.error("Name is required");
        return;
      }

      await createLinkGroup({
        title,
        description,
        userId: user.id,
      });
      toast.success("Link group created successfully");
      setTitle("");
      setDescription("");
      router.refresh();
    } catch (error) {
      toast.error("Failed to create link group");
    }
  };

  return (
    <>
      <Card className="p-4">
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Name"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Input
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Button type="submit" className="flex gap-2">
            <PlusIcon className="w-4 h-4" />
            Add New Group
          </Button>
        </form>
      </Card>
    </>
  );
};

export default NewLinkGroupForm;
