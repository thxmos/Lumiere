"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { toast } from "sonner";
import { XIcon } from "lucide-react";
import { SOCIAL_PLATFORMS } from "@/config/constants/social-media";

export interface IntegrationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: (typeof SOCIAL_PLATFORMS)[number];
}

export const IntegrationDetailsModal = ({
  isOpen,
  onClose,
  platform,
}: IntegrationDetailsModalProps) => {
  const handleRemoveIntegration = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(`Removed ${platform.label} integration`);
      onClose();
    } catch (error) {
      toast.error(`Failed to remove ${platform.label} integration`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <platform.icon className="w-6 h-6" />
            {platform.label} Integration
          </DialogTitle>
          <DialogDescription>
            View and manage your {platform.label} connection to sync your stats
            here
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label className="font-semibold">Connected Account</Label>
            <div className="text-sm text-gray-600">@username</div>
          </div>
          <div className="space-y-2">
            <Label className="font-semibold">Account Type</Label>
            <div className="text-sm text-gray-600">Creator Account</div>
          </div>
          <div className="space-y-2">
            <Label className="font-semibold">Connected Since</Label>
            <div className="text-sm text-gray-600">January 1, 2024</div>
          </div>

          <div className="flex w-full justify-center">
            <Button
              variant="destructive"
              onClick={handleRemoveIntegration}
              className="mt-4 flex items-center gap-2 w-fit"
            >
              <XIcon className="w-4 h-4" />
              Remove Integration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
