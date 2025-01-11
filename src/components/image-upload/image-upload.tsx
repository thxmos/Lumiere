"use client";

import { useState } from "react";
import { DashboardCard } from "@/components/dashboard-card/dashboard-card";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/image-upload/image-upload";

interface Props {
  params: {
    merchId: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { merchId } = params;
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleImageUpload = (files: File[]) => {
    setImages((prevImages) => {
      const newImages = [...prevImages, ...files];
      return newImages.slice(0, 5); // Limit to 5 images
    });
  };

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log({ images, title, description, price, isActive });
  };

  return (
    <DashboardCard
      title={
        <div className="flex items-center">
          <Link href="/dashboard/merch">
            <ChevronLeft className="w-4 h-4 mr-2" />
          </Link>
          <p className="text-lg font-medium text-gray-800">
            {merchId.charAt(0).toUpperCase() + merchId.slice(1)}
          </p>
        </div>
      }
      description={`Product ID: ${merchId}`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="image">Images (up to 5)</Label>
          <ImageUpload
            onChange={handleImageUpload}
            maxFiles={5 - images.length}
            maxSize={1024 * 1024 * 5} // 5MB
            accept={{
              "image/png": [".png"],
              "image/jpeg": [".jpg", ".jpeg"],
            }}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-16 h-16 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(index)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
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
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            step="0.01"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="active"
            checked={isActive}
            onCheckedChange={setIsActive}
          />
          <Label htmlFor="active">Active</Label>
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </DashboardCard>
  );
}
