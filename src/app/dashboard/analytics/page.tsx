import { getUser } from "@/actions/session.actions";
import { getActiveLinksByUserId } from "@/app/[username]/actions";
import { DashboardCard } from "@/components/dashboard-card";
import { Card } from "@/components/ui/card";
export default async function AnalyticsPage() {
  const { user } = await getUser();
  if (!user) {
    return null;
  }

  const links = await getActiveLinksByUserId(user.id);

  return (
    <DashboardCard title="Analytics" description="View your analytics">
      {links.map((link) => (
        <Card key={link.id} className="p-4">
          <p className="text-lg font-bold">{link.title}</p>
          <p className="text-sm text-gray-500">{link.url}</p>
          <p className="text-sm text-gray-500">Clicks: {link.clicks || 0}</p>
        </Card>
      ))}
    </DashboardCard>
  );
}
