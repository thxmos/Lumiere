import { getAllClicksByUserId } from "@/actions/entities/LinkClick/getAllClicksByUserId";
import { getAllProfileViewsByUserId } from "@/actions/entities/ProfileView/getAllProfileViewsByUserId";
import AnalyticsDashboard from "./analytics-dashboard";
import { getScansByUserId } from "@/actions/entities/QRScan/getScansByUserId";

export default async function AnalyticsPage() {
  const scans = await getScansByUserId();
  const clicks = await getAllClicksByUserId();
  const profileViews = await getAllProfileViewsByUserId();

  return (
    <AnalyticsDashboard scans={scans} clicks={clicks} views={profileViews} />
  );
}
