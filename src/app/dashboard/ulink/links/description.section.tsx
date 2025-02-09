import { DashboardCard } from "@/components/layouts/dashboard-card";
import { UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { UserResponse } from "@/repositories/user/types";
import { useState } from "react";
import { updateLinkGroup } from "@/actions/entities/Link/updateLinkGroup";
import { LinkGroupResponse } from "@/repositories/linkGroups/types";
import { toast } from "sonner";

export default function DescriptionSection({
  linkGroup,
}: {
  linkGroup: LinkGroupResponse;
}) {
  const [title, setTitle] = useState(linkGroup.title ?? "");
  const [description, setDescription] = useState(linkGroup.description ?? "");
  const [displayCountry, setDisplayCountry] = useState(
    linkGroup.displayCountry ?? false,
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateLinkGroup(linkGroup.id, {
        title: title,
        description: description,
        displayCountry: displayCountry,
      });
      toast.success("Changes saved", { duration: 3000 });
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes", { duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardCard
      title={
        <div className="flex items-center gap-2">
          <UsersIcon className="w-8 h-8" />
          <p>Description</p>
        </div>
      }
      description="Edit the description of your page"
      footer={
        <div className="flex w-full justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            <p>{isLoading ? "Saving..." : "Save Changes"}</p>
          </Button>
        </div>
      }
    >
      <Label>Title</Label>
      <Input
        placeholder="Enter your title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Label>Description</Label>
      <Textarea
        placeholder="Enter your description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <Switch
          id="display-country"
          checked={displayCountry}
          onCheckedChange={setDisplayCountry}
        />
        <Label>Display Country</Label>
      </div>
    </DashboardCard>
  );
}
