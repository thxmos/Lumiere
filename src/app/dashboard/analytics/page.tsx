import AnalyticsDashboard from "./analytics-dashboard";
import { getLinksByUserId } from "@/actions/entities/link/getLinksByUserId";
import { getScansByUserId } from "@/actions/entities/scan/getScansByUserId";

export default async function AnalyticsPage() {
  const links = await getLinksByUserId();
  const scans = await getScansByUserId();

  return <AnalyticsDashboard links={links} scans={scans} />;
}
