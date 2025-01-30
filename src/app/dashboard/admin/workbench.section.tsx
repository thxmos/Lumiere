"use client";

import { useState } from "react";
import { DashboardCard } from "@/components/layout/dashboard-card";
import { Workbench } from "./workbench";
import { Button } from "@/components/ui/button";
import { Entity } from "./types";

export function WorkbenchSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  const handleEntitySelect = (entity: Entity) => {
    setSelectedEntity(entity);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <DashboardCard
      title="Workbench"
      description="Look up and modify entities here"
    >
      <Workbench
        onEntitySelect={handleEntitySelect}
        isSubmitting={isSubmitting}
      />
      {selectedEntity && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Selected Entity Details:
          </h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(selectedEntity, null, 2)}
          </pre>
        </div>
      )}
    </DashboardCard>
  );
}
