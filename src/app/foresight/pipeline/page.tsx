import { validateAuthPage } from "@/utils/security/auth";
import CampaignSection from "./pipeline.section";

export default async function StrategyPage() {
  await validateAuthPage();

  return (
    <>
      <CampaignSection />
    </>
  );
}
