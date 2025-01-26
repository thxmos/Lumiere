"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, X } from "lucide-react";
import { PLACEHOLDER_IMG } from "@/constants/images";
import { Product2Dto } from "@/data-access/product2";
import { deleteProductById } from "@/actions/product.actions";
import { ConfirmDeleteModal } from "@/components/confirm-delete-modal";
import { useState } from "react";
import { toast } from "sonner";

/*
TODO: Update image list on delete
*/

export function ProductCard({ product }: { product: Product2Dto }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      await deleteProductById(product.id);
      toast.success("Product deleted successfully", { duration: 3000 });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product", { duration: 3000 });
    }
  };

  return (
    <div className="flex items-center p-2 gap-2 bg-card rounded-lg border border-secondary transition-all hover:border-primary justify-between">
      <Link href={`/dashboard/products/${product.id}`}>
        <div className="flex items-center gap-2">
          <Image
            src={product.imageId || PLACEHOLDER_IMG}
            alt={product.name || "Untitled"}
            width={100}
            height={100}
            className="rounded-md border border-secondary transition-all hover:border-primary"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary">
              {product.name || "Untitled"}
            </span>
            <span className="text-lg font-medium text-muted-foreground">
              ${product.price || 0}
            </span>
            <span className="text-sm text-muted-foreground">
              {product.active ? "Active" : "Inactive"}
            </span>
            <span className="text-sm text-muted-foreground">
              {product.isPwyc ? "PWYC" : "Fixed Price"}
            </span>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-end gap-2">
        <Link href={`/dashboard/products/${product.id}`}>
          <Button variant="ghost" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
