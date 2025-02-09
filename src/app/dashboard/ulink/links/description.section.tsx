import { DashboardCard } from "@/components/layouts/dashboard-card";
import { UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export default function DescriptionSection() {
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
          <Button>
            <p>Save Changes</p>
          </Button>
        </div>
      }
    >
      <Label>Title</Label>
      <Input placeholder="Enter your title" />
      <Label>Description</Label>
      <Textarea placeholder="Enter your description" />
      <div className="flex items-center gap-2">
        <Switch id="display-country" />
        <Label>Display Country</Label>
      </div>
    </DashboardCard>
  );
}
