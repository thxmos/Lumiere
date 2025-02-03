"use client";

import { createLinkGroup } from "@/actions/entities/link/createLinkGroup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

import React from "react";
import { useRouter } from "next/navigation";

const LinkGroupForm = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createLinkGroup({
        name,
        description,
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
      <h2 className="text-2xl font-bold">Create Link Group</h2>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">Create</Button>
      </form>
    </>
  );
};

export default LinkGroupForm;
