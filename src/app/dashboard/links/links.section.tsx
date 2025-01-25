"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { type LinkDto } from "@/data-access/links";
import { deleteLink, updateUserLinksAction } from "./links-card.actions";
import { LinksList } from "./components/links-list";
import { DashboardCard } from "@/components/dashboard-card";
import { Button } from "@/components/ui/button";
import { UserDto } from "@/data-access/user";
import { deleteImage } from "@/data-access/images";
import { useLinksStore } from "@/stores/links";

interface Props {
  userLinks: LinkDto[];
  user: UserDto;
}

export function LinksSection({ userLinks, user }: Props) {
  const { links, setLinks } = useLinksStore();

  useEffect(() => {
    setLinks(userLinks);

    return () => setLinks(userLinks);
  }, []);

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
        userId: user.id,
        active: false,
        index: links.length,
        id: uuidv4(),
      } as LinkDto,
    ]);
  };

  const removeLink = async (index: number) => {
    const linkToRemove = links[index] as LinkDto;
    if (linkToRemove.id) {
      try {
        await deleteLink(linkToRemove);
        if (linkToRemove.imageUrl) {
          await deleteImage(linkToRemove.imageUrl, user.id);
        }
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
      description={`Manage your custom links here and track your audience (${links.length}/10)`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <LinksList
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
