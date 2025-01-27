import { getUser } from "@/actions/session.actions";
import { AssetsUploadSection } from "./assets-upload.section";
import { getImagesByUserId } from "@/data-access/images";
import { useAssetStore } from "@/stores/assets";
import AssetsListSection from "./assets-list.section";

export default async function ImagesPage() {
  const { user } = await getUser();
  if (!user) return null;

  const images = await getImagesByUserId(user.id);

  useAssetStore.getState().setAssets(images);

  return (
    <>
      <AssetsUploadSection />
      <AssetsListSection />
    </>
  );
}
