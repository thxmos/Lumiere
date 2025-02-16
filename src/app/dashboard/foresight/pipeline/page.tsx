import { validateAuthPage } from "@/shared/utils/security/auth";
import PipelineSection from "./pipeline.section";

export default async function PipelinePage() {
  await validateAuthPage();

  return (
    <>
      <PipelineSection />
    </>
  );
}
