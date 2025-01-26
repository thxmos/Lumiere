import { getUser } from "@/actions/session.actions";
import ImageListSection from "./assets-list.section";
import { ImageUploadSection } from "./assets-upload.section";
import { getImagesByUserId } from "@/data-access/images";

export default async function ImagesPage() {
  const { user } = await getUser();
  if (!user) return null;

  const images = await getImagesByUserId(user.id);

  return (
    <>
      <ImageUploadSection />
      <ImageListSection images={images} />
    </>
  );
}
