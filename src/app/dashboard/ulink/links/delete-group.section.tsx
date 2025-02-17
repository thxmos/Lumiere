import { deleteLinkGroup } from "@/modules/uLink/actions/link/deleteLinkGroup";
import { DashboardCard } from "@/shared/components/layouts/dashboard-card";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { SettingsIcon, Trash2Icon } from "lucide-react";
import { ConfirmDeleteModal } from "@/shared/components/confirm-delete-modal";
import { toast } from "sonner";

export default function DeleteGroupSection({
  linkGroupId,
}: {
  linkGroupId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteLinkGroup(linkGroupId);
      toast.success("Link group deleted successfully", { duration: 3000 });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete link group", { duration: 3000 });
    }
  };

  return (
    <DashboardCard
      title={
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-8 h-8" />
          <p>Delete</p>
        </div>
      }
      description="Delete a link group"
      footer={
        <div className="flex gap-2 w-full justify-end">
          <Button
            onClick={() => setIsOpen(true)}
            className="flex gap-2 bg-red-600 text-white"
          >
            <Trash2Icon className="w-4 h-4" />
            Delete Link Group
          </Button>
        </div>
      }
    >
      <p>Delete this link group</p>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
      />
    </DashboardCard>
  );
}
