import { getAllClicksByUserId } from "@/actions/entities/LinkClick/getAllClicksByUserId";
import AnalyticsDashboard from "./analytics-dashboard";
import { getLinksByUserId } from "@/actions/entities/Link/getLinksByUserId";
import { getScansByUserId } from "@/actions/entities/QRScan/getScansByUserId";

export default async function AnalyticsPage() {
  const links = await getLinksByUserId();
  const scans = await getScansByUserId();
  const clicks = await getAllClicksByUserId();

  return <AnalyticsDashboard links={links} scans={scans} clicks={clicks} />;
}
