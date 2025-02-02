"use client";

import { DashboardCard } from "@/components/layouts/dashboard-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/utils/utils";
import { toast } from "sonner";
import { createMarketingPlan } from "@/actions/foresight/getMarketingPlan";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Action = {
  id: string;
  title: string;
  description: string;
  completeDate: string;
};

type Category = {
  id: string;
  title: string;
  actions: Action[];
};

type MarketingPlan = {
  id: string;
  categories: Category[];
};

export default function CampaignSection() {
  const [songDescription, setSongDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState<Date>();
  const [marketingPlan, setMarketingPlan] = useState<MarketingPlan | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!songDescription || !releaseDate) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await createMarketingPlan(songDescription, releaseDate);

      if (!response.success) {
        throw new Error(response.error);
      }

      const formattedData = response.data
        ? {
            ...response.data,
            categories: response.data.categories.map((category) => ({
              ...category,
              actions: category.actions.map((action) => ({
                ...action,
                completeDate: action.completeDate.toISOString(),
              })),
            })),
          }
        : null;

      setMarketingPlan(formattedData);
      toast.success("Successfully generated marketing strategy!");
    } catch (error) {
      toast.error("Failed to generate marketing strategy");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardCard
      title="Strategy"
      description="Plan your next release campaign"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="songDescription">About Your Song</Label>
          <Textarea
            id="songDescription"
            placeholder="Describe your song, its genre, mood, inspiration, and target audience..."
            value={songDescription}
            onChange={(e) => setSongDescription(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Release Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !releaseDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {releaseDate
                  ? format(releaseDate, "PPP")
                  : "Select release date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={releaseDate}
                onSelect={setReleaseDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Generating Strategy..." : "Generate Marketing Strategy"}
        </Button>

        {marketingPlan && (
          <div className="mt-6 space-y-4">
            <Label>Marketing Strategy</Label>
            <Accordion type="single" collapsible className="w-full">
              {marketingPlan.categories.map((category) => (
                <AccordionItem key={category.id} value={category.id}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {category.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {category.actions.map((action) => (
                        <Card key={action.id}>
                          <CardHeader>
                            <CardTitle className="text-base">
                              {action.title}
                            </CardTitle>
                            <CardDescription>
                              Complete by:{" "}
                              {format(new Date(action.completeDate), "PPP")}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {action.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </form>
    </DashboardCard>
  );
}
