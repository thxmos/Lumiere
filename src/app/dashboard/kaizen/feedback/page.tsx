import { DashboardCard } from "@components/layouts/dashboard-card";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";

export default function FeedbackPage() {
  return (
    <DashboardCard
      title="Feedback"
      description="Submit your feedback for new features"
    >
      <div className="space-y-4">
        <Textarea placeholder="Enter your feedback here" />
        <Button>Submit</Button>
      </div>
    </DashboardCard>
  );
}
