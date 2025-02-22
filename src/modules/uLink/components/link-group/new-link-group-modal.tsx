"use client";

import { createLinkGroup } from "@ulink/actions/link/createLinkGroup";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface NewLinkGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function NewLinkGroupModal({
  open,
  onOpenChange,
  onSuccess,
}: NewLinkGroupModalProps) {
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");

  const handleCreateNewGroup = async () => {
    try {
      await createLinkGroup({
        title: newGroupName,
        description: newGroupDescription,
      });
      toast.success("Link group created successfully");
      onOpenChange(false);
      setNewGroupName("");
      setNewGroupDescription("");
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to create link group");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Link Group</DialogTitle>
          <DialogDescription>
            Create a new group to organize your links
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={newGroupDescription}
              onChange={(e) => setNewGroupDescription(e.target.value)}
              placeholder="Enter group description"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleCreateNewGroup}>Create Group</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
