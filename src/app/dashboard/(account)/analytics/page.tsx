import { getAllClicksByUserId } from "@ulink/actions/link-click/getAllClicksByUserId";
import { getAllProfileViewsByUserId } from "@ulink/actions/profile-view/getAllProfileViewsByUserId";
import AnalyticsDashboard from "./analytics-dashboard";
import { getScansByUserId } from "@ulink/actions/qr-scan/getScansByUserId";

export default async function AnalyticsPage() {
  const scans = await getScansByUserId();
  const clicks = await getAllClicksByUserId();
  const profileViews = await getAllProfileViewsByUserId();

  return (
    <AnalyticsDashboard scans={scans} clicks={clicks} views={profileViews} />
  );
}
