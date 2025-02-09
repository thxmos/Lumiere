"use client";

import { LinkGroupResponse } from "@/repositories/linkGroups";
import { Label } from "@/components/ui/label";
import { deleteLinkGroup } from "@/actions/entities/Link/deleteLinkGroup";
import { toast } from "sonner";
import { SessionUser } from "@/utils/lib/lucia";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import LinksEditorSections from "./(link-group)/links-editor-section";
import { ThemeResponse } from "@/repositories/theme/types";
import { AssetResponse } from "@/repositories/asset/types";
import { LinkResponse } from "@/repositories/link/types";
import { NewLinkGroupModal } from "./(link-group)/new-link-group-modal";

interface LinkGroupGridProps {
  linkGroups: LinkGroupResponse[];
  user: SessionUser;
  theme: ThemeResponse;
  assets: AssetResponse[];
  links: LinkResponse[];
}

const LinkGroupGrid: React.FC<LinkGroupGridProps> = ({
  linkGroups,
  user,
  links,
  theme,
  assets,
}) => {
  const router = useRouter();
  const [selectedLinkGroupId, setSelectedLinkGroupId] = useState<string | null>(
    linkGroups[0]?.id ?? null,
  );
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteLinkGroup(id);
      toast.success("Link group deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete link group");
    }
  };

  const handleSelectChange = (value: string) => {
    if (value === "new") {
      setIsNewGroupModalOpen(true);
    } else {
      setSelectedLinkGroupId(value);
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center w-full justify-end">
        <Label className="text-foreground font-bold">Link Groups</Label>
        <Select
          defaultValue={linkGroups[0]?.id ?? ""}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a link group" />
          </SelectTrigger>
          <SelectContent>
            {linkGroups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.title}
              </SelectItem>
            ))}
            <SelectItem value="new">New Link Group</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <NewLinkGroupModal
        open={isNewGroupModalOpen}
        onOpenChange={setIsNewGroupModalOpen}
        onSuccess={() => router.refresh()}
      />

      {selectedLinkGroupId && (
        <LinksEditorSections
          linkGroupId={selectedLinkGroupId}
          links={links.filter(
            (link) => link.linkGroupId === selectedLinkGroupId,
          )}
          theme={theme}
          assets={assets}
        />
      )}
    </>
  );
};

export default LinkGroupGrid;
