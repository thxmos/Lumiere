import { getImagesByUserId } from "@/actions/entities/asset/getImagesByUserId";
import { AssetsUploadSection } from "./asset-upload.section";
import AssetsListSection from "./asset-list.section";
import { Image } from "@prisma/client";
import { validateAuthPage } from "@/utils/security/auth";

export default async function ImagesPage() {
  validateAuthPage();

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
