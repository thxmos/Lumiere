"use client";

import { DashboardCard } from "@/components/dashboard-card";
import { Label } from "@/components/ui/label";
import { THEMES } from "@/constants/theme";
import { useTheme } from "next-themes";

export const UserThemeSection = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DashboardCard
      title="Preferences"
      description={`Customize your behind the scenes experience. This will not affect the themes applied to your pages.`}
    >
      <div className="space-y-2">
        <Label>Theme</Label>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((t) => (
            <button
              key={t.name}
              type="button"
              className={`w-8 h-8 rounded-md border-2 ${
                t.name === theme ? "border-primary" : "border-transparent"
              }`}
              style={{ backgroundColor: t.color }}
              onClick={() => setTheme(t.name)}
              aria-label={`Select ${t.name} theme`}
            />
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};
