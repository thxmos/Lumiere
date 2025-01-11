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

interface Props {
  params: {
    merchId: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { merchId } = params;
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log({ image, title, description, price, isActive });
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
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && (
            <p className="mt-2 text-sm text-gray-500">
              Selected file: {image.name}
            </p>
          )}
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
