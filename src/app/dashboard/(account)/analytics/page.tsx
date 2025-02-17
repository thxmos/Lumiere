import { getAllClicksByUserId } from "@/shared/actions/entities/link-click/getAllClicksByUserId";
import { getAllProfileViewsByUserId } from "@/shared/actions/ulink/profile-view/getAllProfileViewsByUserId";
import AnalyticsDashboard from "./analytics-dashboard";
import { getScansByUserId } from "@/shared/actions/ulink/qr-scan/getScansByUserId";

export default async function AnalyticsPage() {
  const scans = await getScansByUserId();
  const clicks = await getAllClicksByUserId();
  const profileViews = await getAllProfileViewsByUserId();

  return (
    <AnalyticsDashboard scans={scans} clicks={clicks} views={profileViews} />
  );
}
