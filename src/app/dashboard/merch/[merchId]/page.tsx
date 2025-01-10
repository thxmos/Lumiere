import { DashboardCard } from "@/components/dashboard-card/dashboard-card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
interface Props {
  params: {
    merchId: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { merchId } = params;

  return (
    <DashboardCard
      title={
        <div className="flex items-center">
          <Link href="/dashboard/merch">
            <ChevronLeft className="w-4 h-4 mr-2" />
          </Link>
          <p className="text-lg font-medium text-gray-800">
            {merchId.charAt(0).toUpperCase() + merchId.slice(1)}
          </p>
        </div>
      }
      description={`Product ID: ${merchId}`}
    >
      <div></div>
    </DashboardCard>
  );
}
