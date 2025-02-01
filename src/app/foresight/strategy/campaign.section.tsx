import { DashboardCard } from "@/components/layouts/dashboard-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { validateAuthPage } from "@/utils/security/auth";
import { MoonIcon } from "lucide-react";
import { SunMoonIcon } from "lucide-react";

export default async function CampaignSection() {
  const user = await validateAuthPage();
  return (
    <DashboardCard
      title="Campaigns"
      description="Plan your next release strategy"
    >
      <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-8">
        <header className="flex items-center justify-center space-x-2 mb-10">
          <SunMoonIcon
            className="text-gradient from-yellow-500 to-orange-500"
            size={40}
          />
          <h1 className="text-4xl font-bold tracking-wide">Lumiere</h1>
          <MoonIcon
            className="text-gradient from-blue-500 to-purple-500"
            size={40}
          />
        </header>

        <div className="w-full max-w-4xl">
          <section className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upload Assets</h2>
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center w-32 h-32 bg-gray-700 rounded-xl border border-gradient-to-r from-blue-500 to-purple-500">
                <span className="text-lg">Upload</span>
              </div>
              <div className="flex-1">
                <Input placeholder="Enter a title" className="mb-3" />
                <Input placeholder="Enter a description" />
              </div>
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 rounded-lg">
                Upload
              </Button>
            </div>
          </section>

          <section className="bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Uploaded Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card
                  key={index}
                  className="relative bg-gray-700 rounded-xl border border-gradient-to-r from-blue-500 to-purple-500 overflow-hidden"
                >
                  <CardContent className="p-4">
                    <div className="text-lg font-medium">Asset {index + 1}</div>
                    <div className="text-sm">Image/Video</div>
                  </CardContent>
                  <button className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full">
                    X
                  </button>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardCard>
  );
}
