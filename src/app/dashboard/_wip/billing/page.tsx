import BillingSection from "./billing.section";
import { getBillingInfo } from "@/actions/stripe/getBillingInfo";
import { validateAuthPage } from "@/utils/security/auth";

export default async function BillingPage() {
  const user = await validateAuthPage();

  const billingInfo = await getBillingInfo(user.id);

  if (!billingInfo) return <>No Maidens</>;

  return <BillingSection billingInfo={billingInfo} />;
}
