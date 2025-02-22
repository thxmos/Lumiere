import { addDays, format } from "date-fns";
import { CheckCheckIcon, CheckIcon, Plus, XIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@components/ui/card";
import { Action, Campaign } from "@prisma/client";
import { createCalendarEvent } from "@foresight/actions/google/createGoogleCalendarEvent";
import { toast } from "sonner";
import { cn } from "@utils/utils";
import CircleProgress from "@components/ui/circle-progress";
import { LUMIERE_GRAY_DARK, LUMIERE_ORANGE } from "@/config/theme/colors";
import { updateGoogleCalendarEvent } from "@foresight/actions/google/updateGoogleCalendarEvent";
import { deleteCalendarEvent } from "@foresight/actions/google/deleteGoogleCalendarEvent";
import { useState, useMemo } from "react";
import { GRADIENT_STYLES } from "@/config/theme/styles";

// TODO: Find the action with the last day of the campaign and use that to filter present/past
// TODO:

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
  const [pipelineView, setPipelineView] = useState<"current" | "past">(
    "current",
  );

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

  const onChangePipelineView = (view: "current" | "past") => {
    setPipelineView(view);
  };

  const addToCalendar = async (action: Action) => {
    try {
      createCalendarEvent(action, selectedCampaign?.songTitle ?? "");
      toast.success("Event added to calendar", { duration: 3000 });
    } catch (error) {
      console.error("Error adding to calendar:", error);
      toast.error("Error adding to calendar", { duration: 3000 });
    }
  };

  const syncCalendar = async (action: Action) => {
    try {
      updateGoogleCalendarEvent(action, selectedCampaign?.songTitle ?? "");
      toast.success("Event updated in calendar", { duration: 3000 });
    } catch (error) {
      console.error("Error updating calendar:", error);
      toast.error("Error updating calendar", { duration: 3000 });
    }
  };

  const deleteFromCalendar = async (action: Action) => {
    try {
      deleteCalendarEvent(action.id);
      toast.success("Event deleted from calendar", { duration: 3000 });
    } catch (error) {
      console.error("Error deleting from calendar:", error);
      toast.error("Error deleting from calendar", { duration: 3000 });
    }
  };

  const renderActionCheckmarks = (action: Action) => {
    let count = 0;
    if (action.completedAt && action.lastSyncedToCalendarAt)
      return <CheckCheckIcon className="h-4 w-4 ml-2 text-orange-500" />;
    if (action.completedAt)
      return <CheckIcon className="h-4 w-4 ml-2 text-orange-500" />;
    if (action.lastSyncedToCalendarAt)
      return <CheckIcon className="h-4 w-4 ml-2" />;
    return <></>;
  };

  return (
    <div className="space-y-4">
      <div className="flex w-full justify-end gap-2 items-center">
        <Badge
          variant={pipelineView === "current" ? "default" : "outline"}
          className={cn("px-2 py-1 text-sm gap-4 items-center cursor-pointer", {
            "bg-orange-500 text-white": pipelineView === "current",
          })}
          onClick={() => onChangePipelineView("current")}
        >
          Current
        </Badge>
        <Badge
          variant={pipelineView === "past" ? "default" : "outline"}
          className={cn("px-2 py-1 text-sm gap-4 items-center cursor-pointer", {
            "bg-orange-500 text-white": pipelineView === "past",
          })}
          onClick={() => onChangePipelineView("past")}
        >
          Past
        </Badge>
      </div>

      <Select value={selectedCampaignId} onValueChange={setSelectedCampaignId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a campaign to view its plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Your Campaigns</SelectLabel>
            {campaigns
              // .filter((campaign) =>
              //   pipelineView === "current"
              //     ? !campaign.actions.some(
              //         (action) => action.completeDate <= new Date(),
              //       )
              //     : campaign.actions.some(
              //         (action) => action.completeDate > new Date(),
              //       ),
              // )
              .map((campaign) => (
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
                <div key={category} className="space-y-4 ">
                  <Badge
                    variant="outline"
                    className="px-4 py-1 text-base gap-4 items-center"
                  >
                    {CATEGORY_TITLES[category]}
                    <CircleProgress
                      current={
                        actions
                          .filter((action) => action.category === category)
                          .filter((action) => action.completedAt).length
                      }
                      total={
                        actions.filter((action) => action.category === category)
                          .length
                      }
                      size={20}
                      strokeWidth={4}
                      progressColor={LUMIERE_ORANGE}
                      backgroundColor={LUMIERE_GRAY_DARK}
                    />
                  </Badge>
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {actions.map((action: Action) => (
                      <Card
                        key={action.id}
                        className={cn("min-w-[300px]", {
                          "border-orange-500": action.completedAt,
                        })}
                      >
                        <CardHeader>
                          <CardTitle
                            className={cn(
                              "text-base flex items-center justify-between",
                              {
                                [GRADIENT_STYLES]: action.completedAt,
                              },
                            )}
                          >
                            <p>{action.title}</p>
                            {renderActionCheckmarks(action)}
                          </CardTitle>
                          {!action.completedAt && (
                            <CardDescription>
                              Complete by:{" "}
                              {format(
                                addDays(new Date(action.completeDate), 1),
                                "PPP",
                              )}
                            </CardDescription>
                          )}
                          {action.completedAt && (
                            <CardDescription className={GRADIENT_STYLES}>
                              Completed
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {action.description}
                          </p>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          {action.lastSyncedToCalendarAt ? (
                            <>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "w-full flex flex-col items-center justify-center text-xs cursor-pointer",
                                  GRADIENT_STYLES,
                                )}
                                onClick={() => syncCalendar(action)}
                              >
                                <p className="text-center">
                                  Last synced to calendar:
                                </p>
                                <p>
                                  {format(
                                    new Date(action.lastSyncedToCalendarAt),
                                    "PPP",
                                  )}
                                </p>
                              </Badge>
                              <Badge
                                variant="outline"
                                className="flex items-center p-2 cursor-pointer"
                                onClick={() => deleteFromCalendar(action)}
                              >
                                <XIcon className="h-4 w-4" />
                              </Badge>
                            </>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full flex items-center gap-2"
                              onClick={() => addToCalendar(action)}
                            >
                              <Plus className="h-4 w-4" /> Add to Calendar
                            </Button>
                          )}
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
