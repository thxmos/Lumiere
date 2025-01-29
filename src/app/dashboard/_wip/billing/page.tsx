import { getUser } from "@/actions/entities/session";
import BillingSection from "./billing.section";
import { getBillingInfo } from "./actions";

export default async function BillingPage() {
  const { user } = await getUser();
  if (!user) return null;

  const billingInfo = await getBillingInfo(user.id);

  if (!billingInfo) return <>No Maidens</>;

  return <BillingSection billingInfo={billingInfo} />;
}
