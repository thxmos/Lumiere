import { deleteLinkGroup } from "@/shared/actions/entities/link/deleteLinkGroup";
import { DashboardCard } from "@/shared/components/layouts/dashboard-card";
import { Button } from "@/shared/components/ui/button";
import { ConfirmDeleteModal } from "../../../../modules/uLink/components/modals/confirm-delete-modal";
import { useState } from "react";
import { SettingsIcon } from "lucide-react";

export default function DeleteGroupSection({
  linkGroupId,
}: {
  linkGroupId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    await deleteLinkGroup(linkGroupId);
  };

  return (
    <DashboardCard
      title={
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-8 h-8" />
          <p>Settings</p>
        </div>
      }
      description="Delete a link group"
      footer={<Button onClick={() => setIsOpen(true)}>Delete</Button>}
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
