"use client";

import { useState } from "react";
import { DashboardCard } from "@/components/dashboard-card/dashboard-card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/image-upload/image-upload";
import { toast } from "sonner";
// import type { CreateProduct2Dto, Product2Dto } from "@/data-access/product2";
import { updateProduct } from "./product.actions";
import { useForm } from "react-hook-form";
import { Product2Dto } from "@/data-access/product2";

interface Props {
  product: Product2Dto;
}

export default function ProductEditTab({ product }: Props) {
  const [image, setImage] = useState(product.image || undefined);
  const [name, setName] = useState(product.name || "");
  const [description, setDescription] = useState(product.description || "");
  const [price, setPrice] = useState(product.price || 0);
  const [active, setActive] = useState(product.active || true);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleImageChange = (imageUrl: string | undefined) => {
    console.log("imageUrl", imageUrl);
    setImage(imageUrl);
  };

  const onSubmit = async () => {
    try {
      const productData = {
        name,
        description,
        image,
        active,
        price,
      };

      await updateProduct(product.id, productData);
      toast.success("Product created successfully", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("An unexpected error occurred", {
        duration: 3000,
      });
    }
  };

  return (
    <DashboardCard
      title={
        <div className="flex items-center">
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4 mr-2" />
          </Link>
          <p className="text-lg font-medium text-gray-800">{product.name}</p>
        </div>
      }
      description={`Product ID: ${product.id}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="image">Image</Label>
          <ImageUpload
            initialImage={image}
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

        <div className="flex items-center space-x-2">
          <Switch
            id="active"
            checked={active}
            onCheckedChange={(checked: boolean) => setActive(checked)}
          />
          <Label htmlFor="active">Active</Label>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </DashboardCard>
  );
}
