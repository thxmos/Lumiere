import { DashboardCard } from "@/components/layouts/dashboard-card";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  return (
    <DashboardCard title="Profile" description="Your profile information">
      <div className="flex flex-col gap-4">
        <Label>Social Media focus</Label>
        <Label>
          Social Media sync - show stats before and after campaign, number of
          uploads, etc
        </Label>
        <Label>Other life obligations</Label>
        <Label>Time available</Label>
        <Label>Warn user if falling behind</Label>
      </div>
    </DashboardCard>
  );
}
