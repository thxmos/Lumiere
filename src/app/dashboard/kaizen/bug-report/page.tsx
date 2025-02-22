import { DashboardCard } from "@components/layouts/dashboard-card";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";

export default function BugsPage() {
  return (
    <DashboardCard title="Bugs" description="Report bugs and issues">
      <div className="space-y-4">
        <Textarea placeholder="Enter your feedback here" />
        <Button>Submit</Button>
      </div>
    </DashboardCard>
  );
}
