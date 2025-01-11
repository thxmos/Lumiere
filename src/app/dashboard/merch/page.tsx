import { DashboardCard } from "@/components/dashboard-card/dashboard-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MerchCard } from "./merch-card";

const MERCH_MOCK = [
  {
    title: "Shirt",
    price: 10,
    imageUrl: null,
  },
  {
    title: "Hat",
    price: 20,
    imageUrl: null,
  },
];

const MerchPage = () => {
  return (
    <DashboardCard title="Merch" description="View your merch">
      <div className="flex flex-col gap-4">
        {MERCH_MOCK.map((merch) => (
          <MerchCard key={merch.title} {...merch} />
        ))}
      </div>
      <Button variant="outline">
        <Plus className="w-4 h-4 mr-2" />
        Create New
      </Button>
    </DashboardCard>
  );
};

export default MerchPage;
