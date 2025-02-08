"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LinkGroupResponse } from "@/repositories/linkGroups";
import LinkGroupForm from "./(link-group)/new-link-group-form";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
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

const basePath = "/dashboard/ulink/links";

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

  return (
    <div className="container">
      <div className="flex gap-4 items-center mb-4">
        {/* Link Group Selector*/}
        <Label className="text-2xl text-foreground font-bold">
          Link Groups
        </Label>
        <Select
          defaultValue={linkGroups[0]?.id ?? ""}
          onValueChange={setSelectedLinkGroupId}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a link group" />
          </SelectTrigger>
          <SelectContent>
            {linkGroups.map((group) => (
              <SelectItem value={group.id}>{group.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {linkGroups.map((group) => (
          <Link href={`${basePath}/${group.id}`} key={group.id}>
            <Card className="h-full cursor-pointer">
              <CardHeader className="flex items-center flex-row w-full justify-between">
                <CardTitle className="select-none">{group.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleDelete(e, group.id)}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="select-none">
                <p>{group.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
        <LinkGroupForm user={user} />
      </div> */}
    </div>
  );
};

export default LinkGroupGrid;
