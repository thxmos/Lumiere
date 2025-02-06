"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LinkIcon, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { LinksList } from "@/app/dashboard/ulink/links/components/links-list";
import { DashboardCard } from "@/components/layouts/dashboard-card";
import { Button } from "@/components/ui/button";
import { useLinksStore } from "@/stores/links";
import { UserDto } from "@/actions/entities/user/createUser";
import { LinkResponse } from "@/repositories/link/types";
import { updateUserLinksAction } from "@/actions/entities/link/updateUserLinks";
import { deleteLinkById } from "@/actions/entities/link/deleteLinkById";
import { uploadAsset } from "@/actions/file-upload/createAsset";

/* 
TODO: Creating new link and submitting form is not working when id is set here
Setting id in the action breaks the draggable list
Cant create a new link when id is set here
Deleting a new link also gives a failure but removes from the list
*/

interface Props {
  userLinks: LinkResponse[];
  user: UserDto;
  linkGroupId: string;
}

export function LinksSection({ userLinks, linkGroupId }: Props) {
  const { links, setLinks } = useLinksStore();

  const [isEditingAnyLink, setIsEditingAnyLink] = useState(true);

  const [assetMap, setAssetMap] = useState<
    {
      id: string;
      file: File;
    }[]
  >([]);

  useEffect(() => {
    setLinks(userLinks);

    return () => setLinks(userLinks);
  }, []);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (e: any) => {
    if (isEditingAnyLink) {
      toast.error("Please finish editing the current link before saving");
      return;
    }

    try {
      // Wait for all asset uploads to complete
      await Promise.all(
        links.map(async (link) => {
          const asset = assetMap.find((asset) => asset.id === link.id);
          if (asset) {
            const formData = new FormData();
            formData.append("file", asset.file);
            formData.append("title", `Link Asset ${link.title}`);
            formData.append(
              "description",
              `Link Asset ${link.title}_Description`,
            );
            const uploadedImage = await uploadAsset(formData);

            link.imageUrl = uploadedImage.url;
            link.imageId = uploadedImage.id;
          }
          return link;
        }),
      );

      // Now that all assets are uploaded, update the links
      const updatedLinks = await updateUserLinksAction(links, linkGroupId);

      if (!updatedLinks) {
        return toast.error("Failed to update links", {
          duration: 2000,
        });
      }

      setLinks(updatedLinks);
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
        active: false,
        index: links.length,
        id: "new-" + uuidv4(), //TODO: SLOPPPPPPP
        linkGroupId: linkGroupId,
      } as LinkResponse,
    ]);
  };

  const removeLink = async (index: number) => {
    const linkToRemove = links[index] as LinkResponse;
    if (linkToRemove.id) {
      try {
        await deleteLinkById(linkToRemove.id);
        toast.success("Link deleted successfully");
      } catch (error) {
        toast.error("Failed to delete link");
      }
    }
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, updatedLink: LinkResponse) => {
    setLinks(links.map((link, i) => (i === index ? updatedLink : link)));
  };

  const insertAssetMap = (id: string, file: File) => {
    setAssetMap((prev) => [...prev, { id, file }]);
  };

  return (
    <DashboardCard
      title={
        <div className="flex items-center gap-2">
          <LinkIcon className="w-8 h-8" />
          Links
        </div>
      }
      description={`Manage your custom links here and track your audience (${links.length}/10)`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <LinksList
          onUpdate={updateLink}
          onDelete={removeLink}
          insertAssetMap={insertAssetMap}
          setIsEditingAnyLink={setIsEditingAnyLink}
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
