import { DashboardCard } from "@/components/dashboard-card";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <DashboardCard
      title="Loading..."
      description="Please wait while we prepare your content."
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    </DashboardCard>
  );
}
