import { X } from "lucide-react";
import Image from "next/image";
import { Image as ImagePrisma } from "@prisma/client";
import { ConfirmDeleteModal } from "@/components/confirm-delete-modal";
import { useState } from "react";
import { deleteImageAction } from "@/actions/image-upload.actions";
import { toast } from "sonner";

export function AssetsCard({
  image,
  index,
}: {
  image: ImagePrisma;
  index: number;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  async function handleConfirmDelete() {
    try {
      await deleteImageAction(image.id);
      setIsDeleteModalOpen(false);
      toast.success("Asset deleted successfully", { duration: 3000 });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete asset", { duration: 3000 });
    }
  }

  return (
    <>
      <div
        key={image.id}
        className="flex items-center justify-between border border-secondary rounded-md gap-4 p-2 hover:border-primary"
      >
        <div className="flex items-center gap-2">
          <div className="text-sm text-primary font-bold">{index + 1}</div>
          <Image
            src={image.url}
            alt={image.url}
            width={100}
            height={100}
            objectFit="cover"
            className="rounded-md border border-primary min-w-[100px] min-h-[100px]"
          />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold text-primary">
              {image.title || "Untitled"}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold">File Type:</span>{" "}
              {image.url ? "Image" : "Video"}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold">File Size:</span>{" "}
              {image.url ? "10MB" : "100MB"}
            </p>
          </div>
        </div>
        <X
          className="w-8 h-8 text-muted-foreground hover:text-primary cursor-pointer"
          onClick={() => setIsDeleteModalOpen(true)}
        />
      </div>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
