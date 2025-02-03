"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Action, Campaign } from "@prisma/client";
import { createCalendarEvent } from "@/actions/google/createGoogleCalendarEvent";
import { toast } from "sonner";

type ActionCategory =
  | "PRE_RELEASE"
  | "RELEASE_DAY"
  | "POST_RELEASE"
  | "GENRE_SPECIFIC"
  | "PLATFORM_AND_AUDIENCE";

const CATEGORY_TITLES: Record<ActionCategory, string> = {
  PRE_RELEASE: "Pre-Release Campaign",
  RELEASE_DAY: "Release Day Activities",
  POST_RELEASE: "Post Release Engagement",
  GENRE_SPECIFIC: "Genre-Specific Strategy",
  PLATFORM_AND_AUDIENCE: "Platform & Audience Strategy",
};

type CampaignWithActions = Campaign & {
  actions: Action[];
};

export function PlanSelector({
  campaigns,
}: {
  campaigns: CampaignWithActions[];
}) {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>("");

  const selectedCampaign = campaigns.find(
    (campaign) => campaign.id === selectedCampaignId,
  );

  const groupedActions = useMemo(() => {
    if (!selectedCampaign) return null;

    const groups: Record<ActionCategory, Action[]> = {
      PRE_RELEASE: [],
      RELEASE_DAY: [],
      POST_RELEASE: [],
      GENRE_SPECIFIC: [],
      PLATFORM_AND_AUDIENCE: [],
    };

    selectedCampaign.actions.forEach((action: Action) => {
      groups[action.category as ActionCategory].push(action);
    });

    return groups;
  }, [selectedCampaign]);

  const addToCalendar = (action: Action) => {
    try {
      createCalendarEvent(action, selectedCampaign?.songTitle ?? "");
      toast.success("Event added to calendar", { duration: 3000 });
    } catch (error) {
      console.error("Error adding to calendar:", error);
      toast.error("Error adding to calendar", { duration: 3000 });
    }
  };

  return (
    <div className="space-y-6">
      <Select value={selectedCampaignId} onValueChange={setSelectedCampaignId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a release to view its plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Your Releases</SelectLabel>
            {campaigns.map((campaign) => (
              <SelectItem key={campaign.id} value={campaign.id}>
                {campaign.songTitle} (
                {format(new Date(campaign.releaseDate), "PPP")})
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedCampaign && groupedActions && (
        <div className="mt-6 space-y-8">
          {(Object.entries(groupedActions) as [ActionCategory, Action[]][]).map(
            ([category, actions]) =>
              actions.length > 0 && (
                <div key={category} className="space-y-4">
                  <Badge variant="outline" className="px-4 py-1 text-base">
                    {CATEGORY_TITLES[category]}
                  </Badge>
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {actions.map((action: Action) => (
                      <Card key={action.id} className="min-w-[300px]">
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
                        <CardFooter>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full flex items-center gap-2"
                            onClick={() => addToCalendar(action)}
                          >
                            <Plus className="h-4 w-4" /> Add to Calendar
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
}
