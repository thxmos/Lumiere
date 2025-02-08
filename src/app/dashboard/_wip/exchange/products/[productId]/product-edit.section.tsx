"use client";

import { useState } from "react";
import { DashboardCard } from "@/components/layouts/dashboard-card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { AssetUpload } from "@/components/upload/asset-upload";
import { toast } from "sonner";
import { updateProduct } from "@/actions/entities/Product/product2";
import { useForm } from "react-hook-form";
import type { Product2Dto } from "@/types/entities/product2";
import { UserDto } from "@/actions/entities/User/createUser";

interface Props {
  product: Product2Dto;
  user: UserDto;
}

export default function ProductEditSection({ product, user }: Props) {
  const [imageId, setImageId] = useState(product.imageId || undefined);
  const [name, setName] = useState(product.name || "");
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price || 0);
  const [active, setActive] = useState(product.active!);
  const [isPwyc, setIsPwyc] = useState(product.isPwyc!);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleImageChange = (imageUrl: string | undefined) => {
    setImageId(imageUrl);
  };

  const onSubmit = async () => {
    try {
      const productData = {
        name,
        description,
        imageId,
        active,
        price,
        isPwyc,
      };

      await updateProduct(product.id, productData);
      toast.success("Product updated successfully", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An unexpected error occurred", {
        duration: 3000,
      });
    }
  };

  return (
    <DashboardCard
      title={
        <div className="flex justify-between items-center">
          <Link href="/ulink/products" className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-2" />
            <p className="text-lg font-medium text-primary">{product.name}</p>
          </Link>
          <Link
            href={`/${user.username}/product/${product.id}`}
            className="text-base underline"
          >
            Preview
          </Link>
        </div>
      }
      description={
        <span className="text-sm text-muted-foreground">
          <span className="font-bold">ID:</span> {product.id}
        </span>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="image">Image</Label>
          <AssetUpload
            initialImage={imageId}
            size="lg"
            onImageChange={(image: string | null) =>
              handleImageChange(image || undefined)
            }
          />
        </div>

        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Enter product price"
            step="0.01"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="isPwyc"
              checked={isPwyc}
              onCheckedChange={(checked: boolean) => setIsPwyc(checked)}
            />
            <Label htmlFor="isPwyc">Pay What You Can</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={active}
              onCheckedChange={(checked: boolean) => setActive(checked)}
            />
            <Label htmlFor="active">Active</Label>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Product"}
          </Button>
        </div>
      </form>
    </DashboardCard>
  );
}
