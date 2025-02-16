import { DashboardCard } from "@/modules/shared/components/layouts/dashboard-card";
import { Label } from "@/modules/shared/components/ui/label";

export default function RoadmapPage() {
  return (
    <DashboardCard
      title="Roadmap"
      description="List view for upcoming actions and completion criteria"
    >
      <div className="flex flex-col gap-4">
        <Label>Focus On Today</Label>
        <Label>Gantt Chart</Label>
        <Label>List View</Label>
        <Label>Right hand view of completion for each action</Label>
        <Label>Warn user if falling behind</Label>
      </div>
    </DashboardCard>
  );
}
