"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LinkGroupResponse } from "@/repositories/linkGroups";
import LinkGroupForm from "../link-group-form";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { deleteLinkGroup } from "@/actions/entities/link/deleteLinkGroup";
import { toast } from "sonner";
import { SessionUser } from "@/utils/lib/lucia";
import { useRouter } from "next/navigation";

const basePath = "/ulink/links";

interface LinkGroupGridProps {
  linkGroups: LinkGroupResponse[];
  user: SessionUser;
}

const LinkGroupGrid: React.FC<LinkGroupGridProps> = ({ linkGroups, user }) => {
  const router = useRouter();

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
      <Label className="text-2xl text-foreground font-bold">Link Groups</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
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
      </div>
    </div>
  );
};

export default LinkGroupGrid;
