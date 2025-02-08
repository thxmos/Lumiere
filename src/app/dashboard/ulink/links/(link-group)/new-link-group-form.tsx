"use client";

import { createLinkGroup } from "@/actions/entities/Link/createLinkGroup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { SessionUser } from "@/utils/lib/lucia";

const LinkGroupForm = ({ user }: { user: SessionUser }) => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (name.length === 0) {
        toast.error("Name is required");
        return;
      }

      await createLinkGroup({
        name,
        description,
        userId: user.id,
      });
      toast.success("Link group created successfully");
      setName("");
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
            onChange={(e) => setName(e.target.value)}
            value={name}
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

export default LinkGroupForm;
