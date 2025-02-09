"use client";

import { LinkGroupResponse } from "@/repositories/linkGroup";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import LinksEditorSections from "./(link-group)/links-editor-section";
import { ThemeResponse } from "@/repositories/theme/types";
import { AssetResponse } from "@/repositories/asset/types";
import { LinkResponse } from "@/repositories/link/types";
import { NewLinkGroupModal } from "./(link-group)/new-link-group-modal";
import { UserResponse } from "@/repositories/user/types";
import { PlusIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { setActiveLinkGroup } from "@/actions/entities/link/setActiveLinkGroup";
import { toast } from "sonner";

interface LinkGroupGridProps {
  linkGroups: LinkGroupResponse[];
  user: UserResponse;
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
    linkGroups.sort(
      (a, b) => b.updatedAt!.getTime() - a.updatedAt!.getTime(), // sort by updatedAt in descending order
    )[0]?.id ?? null,
  );
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);

  const handleSelectChange = (value: string) => {
    if (value === "add-new") {
      setIsNewGroupModalOpen(true);
    } else {
      setSelectedLinkGroupId(value);
    }
  };

  const handleSetActiveLinkGroup = async (checked: boolean) => {
    if (checked) {
      await setActiveLinkGroup(selectedLinkGroupId!);
      toast.success("Link group activated", { duration: 3000 });
    } else {
      toast.warning("Please select another link group to activate", {
        duration: 3000,
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center w-full">
          <Label className="text-2xl text-foreground font-bold">
            Link Group
          </Label>
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
              <SelectSeparator />
              <SelectItem value="add-new">
                <span className="flex items-center gap-2">
                  <PlusIcon className="w-4 h-4" /> Add New Link Group
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="active">Active</Label>
          <Switch
            id="active"
            checked={
              linkGroups.find((group) => group.id === selectedLinkGroupId)
                ?.active ?? false
            }
            onCheckedChange={handleSetActiveLinkGroup}
          />
        </div>
      </div>

      <NewLinkGroupModal
        open={isNewGroupModalOpen}
        onOpenChange={setIsNewGroupModalOpen}
        onSuccess={() => router.refresh()}
      />

      {selectedLinkGroupId && (
        <LinksEditorSections
          linkGroup={
            linkGroups.find((group) => group.id === selectedLinkGroupId)!
          }
          user={user}
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
