"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { LinkDto } from "@/data-access/links";
import { LinkInput } from "./_components/link-input";
import { deleteLink, updateUserLinks } from "./links.actions";
import { DashboardCard } from "@/components/dashboard-card/dashboard-card";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface LinksCardProps {
  userLinks: LinkDto[];
  userId: string;
}

export function LinksCard({ userLinks, userId }: LinksCardProps) {
  const [links, setLinks] = useState<LinkDto[]>(userLinks);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    try {
      await updateUserLinks(userId, links);
      // You might want to add a success message here
    } catch (error) {
      console.error("Failed to update links:", error);
      // You might want to add an error message here
    }
  };

  const addLink = () => {
    setLinks([
      ...links,
      { title: "", url: "", imageUrl: "", userId } as LinkDto,
    ]);
  };

  const removeLink = async (index: number) => {
    const linkToRemove = links[index];
    if (linkToRemove.id) {
      try {
        await deleteLink(linkToRemove.id);
      } catch (error) {
        console.error("Failed to delete link:", error);
        return; // Don't remove from state if delete failed
      }
    }
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, updatedLink: LinkDto) => {
    setLinks(links.map((link, i) => (i === index ? updatedLink : link)));
  };

  const moveLink = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index > 0) ||
      (direction === "down" && index < links.length - 1)
    ) {
      const newLinks = [...links];
      const swapIndex = direction === "up" ? index - 1 : index + 1;
      [newLinks[index], newLinks[swapIndex]] = [
        newLinks[swapIndex],
        newLinks[index],
      ];
      setLinks(newLinks);
    }
  };

  return (
    <DashboardCard title="Links" description="Manage your custom links here">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          {links.map((link, index) => (
            <LinkInput
              key={link.id || index}
              link={link}
              index={index}
              onUpdate={updateLink}
              onDelete={removeLink}
              onMoveUp={() => moveLink(index, "up")}
              onMoveDown={() => moveLink(index, "down")}
            />
          ))}
        </div>
      </form>
      <div className="flex justify-end px-0 space-x-2">
        <Button type="submit" disabled={isSubmitting}>
          Save Changes
        </Button>
      </div>
    </DashboardCard>
  );
}
