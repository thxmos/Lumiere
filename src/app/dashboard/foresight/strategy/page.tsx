import { validateAuthPage } from "@utils/security/auth";
import CampaignSection from "./campaign.section";

export default async function StrategyPage() {
  await validateAuthPage();

  return (
    <>
      <CampaignSection />
    </>
  );
}
