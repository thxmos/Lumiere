"use client";

import { Image as ImagePrisma } from "@prisma/client";
import Image from "next/image";
import { DashboardCard } from "@/components/dashboard-card";
import { X } from "lucide-react";

/*
sort by favourites then created at desc
*/

export default function ImageListSection({
  images,
}: {
  images: ImagePrisma[];
}) {
  return (
    <DashboardCard
      title="Uploaded Assets"
      description="Manage your images and videos"
    >
      <div className="flex flex-col justify-between gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-secondary rounded-md gap-4 p-2 hover:border-primary"
          >
            <div className="flex items-center gap-2">
              <div className="text-sm text-primary font-bold">{index + 1}</div>
              <Image
                src={image.url}
                alt={image.url}
                width={100}
                height={100}
                objectFit="contain"
              />
              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold text-primary">{image.title}</p>
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
            <X className="w-8 h-8 text-muted-foreground hover:text-primary cursor-pointer" />
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
