import { getUser } from "@/actions/entities/session";
import { getImagesByUserId } from "@/actions/entities/asset/getImagesByUserId";
import { AssetsUploadSection } from "./assets-upload.section";
import AssetsListSection from "./assets-list.section";
import { Image } from "@prisma/client";

export default async function ImagesPage() {
  const { user } = await getUser();
  if (!user) return null;

  const assets = await getImagesByUserId();

  // TODO: make into a helper method
  // const assetsWithUrl = assets.map((asset) => ({
  //   ...asset,
  //   url: asset.url.replace("https://", "https://"),
  // }));

  return (
    <>
      <AssetsUploadSection />
      <AssetsListSection initialAssets={assets as Image[]} />
    </>
  );
}
