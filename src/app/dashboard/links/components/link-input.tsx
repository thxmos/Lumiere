import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/image-upload/image-upload";
import { ChevronUp, ChevronDown, Trash } from "lucide-react";
import { useState } from "react";
import { ConfirmDeleteModal } from "./confirm-delete-modal";
import { LinkDto } from "@/data-access/links";

interface LinkItemProps {
  link: LinkDto;
  index: number;
  onUpdate: (index: number, updatedLink: LinkDto) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (index: number) => void;
}

const LinkItem: React.FC<LinkItemProps> = ({
  link,
  index,
  onUpdate,
  onMoveUp,
  onMoveDown,
  onDelete,
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

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(index);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center space-x-4 justify-between">
        <p className="text-sm text-muted-foreground">{index + 1}</p>
        <ImageUpload
          initialImage={link.imageUrl ?? undefined}
          onImageChange={(image) => handleImageChange(image ?? "")}
        />
        <div className="flex space-x-4 flex-1 items-center">
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            placeholder="Title"
            value={link.title}
            onChange={handleInputChange}
            aria-label="Link title"
            required
          />
          <Label htmlFor="url">URL</Label>
          <Input
            name="url"
            placeholder="URL"
            value={link.url}
            onChange={handleInputChange}
            aria-label="Link URL"
            required
            type="url"
          />
        </div>
        <div className="flex space-x-4 items-center">
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
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onMoveUp(index)}
          >
            <ChevronUp className="h-4 w-4" />
            <span className="sr-only">Move link up</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onMoveDown(index)}
          >
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Move link down</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleDeleteClick}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete link</span>
          </Button>
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default LinkItem;
