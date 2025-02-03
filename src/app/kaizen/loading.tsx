import { DashboardCard } from "@/components/layouts/dashboard-card";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <DashboardCard>
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-semibold text-primary">Loading...</h2>
          <p className="text-center text-gray-500">
            Please wait while we prepare your content.
          </p>
        </div>
      </div>
    </DashboardCard>
  );
}
