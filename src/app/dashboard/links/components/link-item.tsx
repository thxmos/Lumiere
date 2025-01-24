import React, { useState } from "react";
import { DraggableProvided } from "@hello-pangea/dnd";
import { RxDragHandleDots2 } from "react-icons/rx";

import { LinkDto } from "@/data-access/links";
import { ImageUpload } from "@/components/image-upload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { ConfirmDeleteModal } from "./confirm-delete-modal";

interface Props {
  link: LinkDto;
  index: number;
  draggableProvided: DraggableProvided;
  onUpdate: (index: number, updatedLink: LinkDto) => void;
  onDelete: (index: number) => void;
  moveLink: (index: number, direction: "up" | "down") => void;
}

const LinkItem: React.FC<Props> = ({
  link,
  index,
  draggableProvided,
  onUpdate,
  onDelete,
  moveLink,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | boolean,
    field?: string,
  ) => {
    if (typeof event === "boolean" && field) {
      const updatedLink = { ...link, [field]: event };
      onUpdate(index, updatedLink);
    } else if (typeof event !== "boolean") {
      const { name, value } = event.target;
      const updatedLink = { ...link, [name]: value };
      onUpdate(index, updatedLink);
    }
  };

  const handleImageChange = (imageUrl: string) => {
    const updatedLink = { ...link, imageUrl };
    onUpdate(index, updatedLink);
  };

  const handleConfirmDelete = () => {
    onDelete(index);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <li
        ref={draggableProvided.innerRef}
        {...draggableProvided.draggableProps}
        className="border border-border rounded-lg p-4 flex justify-between items-center"
      >
        <div className="flex gap-4 items-center justify-between w-full">
          {/* Image Upload */}
          <div>
            <ImageUpload
              initialImage={link.imageUrl ?? undefined}
              onImageChange={(image) => handleImageChange(image ?? "")}
            />
          </div>

          {/* Title & Link Input */}
          <div className="flex flex-col flex-1 space-y-2">
            <div className="flex items-center gap-4 w-full max-w-[400px]">
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                placeholder="Title"
                value={link.title}
                onChange={handleInputChange}
                aria-label="Link title"
                required
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-4 w-full max-w-[400px]">
              <Label htmlFor="url">URL</Label>
              <Input
                name="url"
                placeholder="URL"
                value={link.url}
                onChange={handleInputChange}
                aria-label="Link URL"
                required
                type="url"
                className="w-full"
              />
            </div>
          </div>

          {/* Active Switch */}
          <div className="flex items-center space-x-2">
            <Switch
              checked={link.active}
              onCheckedChange={(checked) =>
                handleInputChange(checked, "active")
              }
              aria-label="Toggle link active status"
            />
            <Label htmlFor={`active-${index}`} className="text-sm w-14">
              {link.active ? "Active" : "Inactive"}
            </Label>
          </div>

          {/* Delete Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete link</span>
          </Button>

          {/* Drag Handle */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            {...draggableProvided.dragHandleProps}
            className="cursor-grab"
          >
            <RxDragHandleDots2 className="h-4 w-4" />
          </Button>
        </div>
      </li>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default LinkItem;
