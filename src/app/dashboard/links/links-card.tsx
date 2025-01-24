"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { type LinkDto } from "@/data-access/links";
import { deleteLink, updateUserLinksAction } from "./links-card.actions";
import LinkList from "./components/link-list";
import { DashboardCard } from "@/components/dashboard-card";
import { Button } from "@/components/ui/button";

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
      await updateUserLinksAction(links);
      toast.success("Links updated successfully", {
        duration: 2000,
      });
    } catch (error) {
      toast.error("Failed to update links", {
        duration: 2000,
      });
      console.error("Failed to update links:", error);
    }
  };

  const addLink = () => {
    setLinks([
      ...links,
      {
        title: "",
        url: "https://",
        imageUrl: "",
        userId,
        active: false,
        index: links.length,
      } as LinkDto,
    ]);
  };

  const removeLink = async (index: number) => {
    const linkToRemove = links[index];
    if (linkToRemove.id) {
      try {
        await deleteLink(linkToRemove.id);
        toast.success("Link deleted successfully");
      } catch (error) {
        toast.error("Failed to delete link");
        console.error("Failed to delete link:", error);
        // Don't remove from state if delete failed
      }
    }
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, updatedLink: LinkDto) => {
    setLinks(links.map((link, i) => (i === index ? updatedLink : link)));
  };

  return (
    <DashboardCard
      title="Links"
      description={`Manage your custom links here (${links.length}/10)`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <LinkList
          links={links}
          setLinks={setLinks}
          onUpdate={updateLink}
          onDelete={removeLink}
        />
        <div className="flex justify-end px-0 space-x-2">
          <Button type="button" variant="outline" onClick={addLink}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Link
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Save Changes
          </Button>
        </div>
      </form>
    </DashboardCard>
  );
}
