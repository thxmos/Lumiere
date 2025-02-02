"use client";

import { useState } from "react";
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
import type { SongWithMarketing } from "@/actions/foresight/getMarketingPlanFromDb";

type PlanSelectorProps = {
  songs: SongWithMarketing[];
};

export function PlanSelector({ songs }: PlanSelectorProps) {
  const [selectedSongId, setSelectedSongId] = useState<string>("");

  const selectedSong = songs.find((song) => song.id === selectedSongId);
  const selectedPlan = selectedSong?.marketingPlans[0]; // Assuming one plan per song for now

  const addToCalendar = (action: any) => {
    console.log("Adding to calendar:", action);
  };

  return (
    <div className="space-y-6">
      <Select value={selectedSongId} onValueChange={setSelectedSongId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a release to view its plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Your Releases</SelectLabel>
            {songs.map((song) => (
              <SelectItem key={song.id} value={song.id}>
                {song.description} ({format(new Date(song.releaseDate), "PPP")})
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedPlan && (
        <div className="mt-6 space-y-8">
          {selectedPlan.categories.map((category) => (
            <div key={category.id} className="space-y-4">
              <Badge variant="outline" className="px-4 py-1 text-base">
                {category.title}
              </Badge>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {category.actions.map((action) => (
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
          ))}
        </div>
      )}
    </div>
  );
}
