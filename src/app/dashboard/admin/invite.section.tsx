"use client";

import { DashboardCard } from "@/components/layout/dashboard-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

/*
    Create a one time login for a user with that email address.
    Return password in response.
*/

export const InviteSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <DashboardCard
      title="Invite"
      description="Invite a user and create a one time login by email address."
      footer={
        <div className="flex flex-1 justify-end">
          <Button type="submit" form="invite-form" disabled={isSubmitting}>
            {isSubmitting ? "Inviting..." : "Invite"}
          </Button>
        </div>
      }
    >
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit}
        id="invite-form"
      >
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>
    </DashboardCard>
  );
};

export default InviteSection;
