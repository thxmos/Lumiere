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
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/utils/utils";
import { toast } from "sonner";
import { createMarketingPlan } from "@/actions/foresight/getMarketingPlan";

type ActionCategory =
  | "PRE_RELEASE"
  | "RELEASE_DAY"
  | "POST_RELEASE"
  | "GENRE_SPECIFIC"
  | "PLATFORM_AND_AUDIENCE";

type FormattedAction = {
  id: string;
  title: string;
  description: string;
  completeDate: string;
  category: ActionCategory;
  campaignId: string;
  createdAt: string;
  updatedAt: string;
};

type FormattedCampaign = {
  id: string;
  songTitle: string;
  songDescription?: string;
  genre?: string;
  mood?: string;
  inspiration?: string;
  targetAudience?: string;
  releaseDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  actions: FormattedAction[];
};

export default function CampaignSection() {
  const [songTitle, setSongTitle] = useState("");
  const [songDescription, setSongDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [mood, setMood] = useState("");
  const [inspiration, setInspiration] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [releaseDate, setReleaseDate] = useState<Date>();
  const [campaign, setCampaign] = useState<FormattedCampaign | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !songTitle ||
      !songDescription ||
      !genre ||
      !mood ||
      !inspiration ||
      !targetAudience ||
      !releaseDate
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await createMarketingPlan({
        songTitle,
        songDescription,
        genre,
        mood,
        inspiration,
        targetAudience,
        releaseDate,
      });

      if (!response.success) {
        throw new Error(response.error);
      }

      // Format the data for client-side storage
      if (response.data) {
        const formattedCampaign: FormattedCampaign = {
          id: response.data.id,
          songTitle: response.data.songTitle,
          songDescription: response.data.songDescription || "",
          genre: response.data.genre || "",
          mood: response.data.mood || "",
          inspiration: response.data.inspiration || "",
          targetAudience: response.data.targetAudience || "",
          releaseDate: response.data.releaseDate.toISOString(),
          userId: response.data.userId,
          createdAt: response.data.createdAt.toISOString(),
          updatedAt: response.data.updatedAt.toISOString(),
          actions: response.data.actions.map((action) => ({
            id: action.id,
            title: action.title,
            description: action.description,
            completeDate: action.completeDate.toISOString(),
            category: action.category,
            campaignId: action.campaignId,
            createdAt: action.createdAt.toISOString(),
            updatedAt: action.updatedAt.toISOString(),
          })),
        };

        setCampaign(formattedCampaign);
        toast.success("Successfully generated marketing strategy!", {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to generate marketing strategy", {
        duration: 3000,
      });
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
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="songTitle">Song Title</Label>
            <Textarea
              id="songTitle"
              placeholder="What is the title of your song?"
              value={songTitle}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setSongTitle(e.target.value);
                }
              }}
              className="resize-none"
              rows={2}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground text-right">
              {songTitle.length}/100
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="songDescription">Song Description</Label>
            <Textarea
              id="songDescription"
              placeholder="What is the description of your song?"
              value={songDescription}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setSongDescription(e.target.value);
                }
              }}
              className="resize-none"
              rows={2}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground text-right">
              {songDescription.length}/100
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Textarea
              id="genre"
              placeholder="What genre is your song?"
              value={genre}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setGenre(e.target.value);
                }
              }}
              className="resize-none"
              rows={2}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground text-right">
              {genre.length}/100
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mood">Mood</Label>
            <Textarea
              id="mood"
              placeholder="What's the mood of your song?"
              value={mood}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setMood(e.target.value);
                }
              }}
              className="resize-none"
              rows={2}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground text-right">
              {mood.length}/100
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inspiration">Inspiration</Label>
            <Textarea
              id="inspiration"
              placeholder="What inspired this song?"
              value={inspiration}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setInspiration(e.target.value);
                }
              }}
              className="resize-none"
              rows={2}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground text-right">
              {inspiration.length}/100
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Textarea
              id="targetAudience"
              placeholder="Who is this song for?"
              value={targetAudience}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setTargetAudience(e.target.value);
                }
              }}
              className="resize-none"
              rows={2}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground text-right">
              {targetAudience.length}/100
            </p>
          </div>
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
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Strategy...
            </>
          ) : (
            "Generate Marketing Strategy"
          )}
        </Button>

        {campaign && (
          <div className="mt-6 space-y-4">
            <Label>Completed!</Label>
          </div>
        )}
      </form>
    </DashboardCard>
  );
}
