"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { LinksList } from "./components/links-list";
import { DashboardCard } from "@/components/dashboard-card";
import { Button } from "@/components/ui/button";
import { deleteImage } from "@/actions/entities/assets";
import { useLinksStore } from "@/stores/links";
import { UserDto } from "@/actions/entities/user";
import { LinkResponse } from "@/repositories/link/types";
import { updateUserLinksAction } from "@/actions/entities/link/updateUserLinks";
import { deleteLinkById } from "@/actions/entities/link/deleteLinkById";

/* 
TODO: Creating new link and submitting form is not working when id is set here
Setting id in the action breaks the draggable list
Cant create a new link when id is set here
Deleting a new link also gives a failure but removes from the list
*/

interface Props {
  userLinks: LinkResponse[];
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
      const updatedLinks = await updateUserLinksAction(links);
      if (updatedLinks) {
        setLinks(updatedLinks);
        toast.success("Links updated successfully", {
          duration: 2000,
        });
      } else {
        toast.error("Failed to update links", {
          duration: 2000,
        });
      }
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
        id: "new-" + uuidv4(), //TODO: SLOPPPPPPP
      } as LinkResponse,
    ]);
  };

  const removeLink = async (index: number) => {
    const linkToRemove = links[index] as LinkResponse;
    if (linkToRemove.id) {
      try {
        await deleteLinkById(linkToRemove.id);
        if (linkToRemove.imageUrl) {
          await deleteImage(linkToRemove.imageUrl, user.id);
        }
        toast.success("Link deleted successfully");
      } catch (error) {
        toast.error("Failed to delete link");
        // Don't remove from state if delete failed
      }
    }
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, updatedLink: LinkResponse) => {
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
          <Button
            type="button"
            variant="outline"
            onClick={addLink}
            disabled={links.length >= 10}
          >
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
