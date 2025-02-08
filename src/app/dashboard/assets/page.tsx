import { getAssetsByUserId } from "@/actions/entities/Asset/getAssetsByUserId";
import { AssetsUploadSection } from "./asset-upload.section";
import AssetsListSection from "./asset-list.section";
import { Asset } from "@prisma/client";
import { validateAuthPage } from "@/utils/security/auth";
import { ScrollToTopLayout } from "@/components/layouts/scroll-to-top.layout";

export default async function AssetsPage() {
  validateAuthPage();

  const assets = await getAssetsByUserId();

  // TODO: make into a helper method
  // const assetsWithUrl = assets.map((asset) => ({
  //   ...asset,
  //   url: asset.url.replace("https://", "https://"),
  // }));

  return (
    <ScrollToTopLayout>
      <AssetsUploadSection />
      <AssetsListSection initialAssets={assets as Asset[]} />
    </ScrollToTopLayout>
  );
}
