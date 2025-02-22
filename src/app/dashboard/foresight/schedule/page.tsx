"use client";

import { useCallback, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@components/ui/button";
import { DashboardCard } from "@components/layouts/dashboard-card";
import { cn } from "@utils/utils";

// TODO: Add your own notes each calendar day

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const daysInMonth = useCallback(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const isToday = (date: Date) => {
    return format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
  };

  return (
    <DashboardCard title="Calendar" description="View your calendar">
      <div className="space-y-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="rounded-lg border">
          {/* Days of week */}
          <div className="grid grid-cols-7 gap-px bg-muted">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="bg-background p-2 text-center text-sm font-medium"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-px bg-muted">
            {daysInMonth().map((day, idx) => {
              const dayNumber = format(day, "d");
              const firstDay = idx === 0;
              const dayOfWeek = day.getDay() + 1; // 1-7 (Sunday = 1)
              const startOffset = firstDay ? dayOfWeek - 1 : 0;

              return (
                <div
                  key={day.toString()}
                  style={
                    firstDay
                      ? { gridColumnStart: dayOfWeek }
                      : { gridColumnStart: startOffset }
                  }
                  className={cn(
                    "min-h-24 bg-background p-2",
                    isToday(day) && "bg-muted/50",
                  )}
                >
                  <time
                    dateTime={format(day, "yyyy-MM-dd")}
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-sm",
                      isToday(day) &&
                        "bg-primary text-primary-foreground font-semibold",
                    )}
                  >
                    {dayNumber}
                  </time>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
