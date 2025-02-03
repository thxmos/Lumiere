import type React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { DraggableProvided } from "@hello-pangea/dnd";
import { RxDragHandleDots2 } from "react-icons/rx";
import { AssetUpload } from "@/components/upload/asset-upload";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash, Edit, Check, X } from "lucide-react";
import { ConfirmDeleteModal } from "@/app/ulink/_components/modals/confirm-delete-modal";
import { Label } from "@/components/ui/label";
import { LinkResponse } from "@/repositories/link/types";

/*
- text ellipsis on mobile
*/

interface Props {
  link: LinkResponse;
  index: number;
  draggableProvided: DraggableProvided;
  onUpdate: (index: number, updatedLink: LinkResponse) => void;
  onDelete: (index: number) => void;
  insertAssetMap: (id: string, file: File) => void;
  setIsEditingAnyLink: (isEditing: boolean) => void;
}

export const LinkCard: React.FC<Props> = ({
  link,
  index,
  draggableProvided,
  onUpdate,
  onDelete,
  insertAssetMap,
  setIsEditingAnyLink,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLink, setEditedLink] = useState(link);

  useEffect(() => {
    setIsEditingAnyLink(isEditing);
  }, [isEditing]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | boolean,
    field?: string,
  ) => {
    if (typeof event === "boolean" && field) {
      setEditedLink({ ...editedLink, [field]: event });
    } else if (typeof event !== "boolean") {
      const { name, value } = event.target;
      setEditedLink({ ...editedLink, [name]: value });
    }
  };

  const handleConfirmDelete = () => {
    onDelete(index);
    setIsDeleteModalOpen(false);
  };

  const handleSaveChanges = () => {
    onUpdate(index, editedLink);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedLink(link);
    setIsEditing(false);
  };

  const onAssetChange = async (file: File | null) => {
    if (!file) return;

    insertAssetMap(link.id, file);
  };

  return (
    <>
      <li
        ref={draggableProvided.innerRef}
        {...draggableProvided.draggableProps}
        className="border border-secondary hover:border-primary bg-card transition-all rounded-lg p-4 flex justify-between items-center mb-4"
      >
        <div className="flex gap-4 items-center justify-between w-full">
          <Label className="font-bold text-primary">{index + 1}</Label>

          {/* Image Upload */}
          <div>
            <AssetUpload
              file={file}
              setFile={setFile}
              disabled={!isEditing}
              onImageChange={onAssetChange}
              initialImage={link.imageUrl}
            />
          </div>

          {/* Title & Link Input */}
          <div className="flex flex-col flex-1 space-y-2 max-w-[80%] overflow-hidden whitespace-nowrap">
            {isEditing ? (
              <>
                <Input
                  name="title"
                  placeholder="Title"
                  value={editedLink.title}
                  onChange={handleInputChange}
                  aria-label="Link title"
                  required
                  className="w-full"
                />
                <Input
                  name="url"
                  placeholder="URL"
                  value={editedLink.url}
                  onChange={handleInputChange}
                  aria-label="Link URL"
                  required
                  type="url"
                  className="w-full"
                />
              </>
            ) : (
              <>
                <span className="text-lg font-bold text-primary block">
                  {link.title || "Untitled"}
                </span>
                <Link href={link.url} target="_blank">
                  <span className="text-sm text-muted-foreground hover:text-primary hover:underline transition-all block">
                    {link.url}
                  </span>
                </Link>
                <span className="text-sm text-muted-foreground block">
                  Clicks: {link.clicks ?? 0}
                </span>
              </>
            )}
          </div>

          {/* Active Switch */}
          <div className="flex items-center space-x-2">
            <Switch
              checked={editedLink.active}
              onCheckedChange={(checked) =>
                handleInputChange(checked, "active")
              }
              aria-label="Toggle link active status"
              disabled={!isEditing}
            />
            <span className="text-sm w-14">
              {editedLink.active ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Edit/Save/Cancel Buttons */}
          {isEditing ? (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleSaveChanges}
              >
                <Check className="h-4 w-4" />
                <span className="sr-only">Save changes</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleCancelEdit}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Cancel edit</span>
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit link</span>
            </Button>
          )}

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
          {!isEditing && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              {...draggableProvided.dragHandleProps}
              className="cursor-grab"
            >
              <RxDragHandleDots2 className="h-4 w-4" />
            </Button>
          )}
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
