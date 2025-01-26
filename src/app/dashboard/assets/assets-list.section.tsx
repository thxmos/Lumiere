"use client";

import { Image as ImagePrisma } from "@prisma/client";
import { DashboardCard } from "@/components/dashboard-card";
import { AssetsCard } from "./assets-list.card";

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
          <AssetsCard key={index} image={image} index={index} />
        ))}
      </div>
    </DashboardCard>
  );
}
