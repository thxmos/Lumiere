"use client";

import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/dashboard-card";
import Link from "next/link";
import { Price, Product } from "@prisma/client";

export default function BillingTab({
  billingInfo,
}: {
  billingInfo: { price: Price; product: Product };
}) {
  const { price, product } = billingInfo;
  const unitAmount = Number(price.unitAmount) / 100; // Convert BigInt to number and divide by 100 if it's in cents

  return (
    <DashboardCard
      title="Subscription Details"
      description="Manage your subscription plan"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2" id="billing-history">
            {product.name}
          </h3>
          {billingInfo ? (
            <div className="flex flex-col gap-2">
              <p>{product.description}</p>
              <h4>
                ${unitAmount} {price.currency?.toUpperCase()}
              </h4>
              <span className="text-sm text-gray-500">
                {product.active ? "Active" : "Inactive"}
              </span>
            </div>
          ) : (
            <h4>No active subscription</h4>
          )}
        </div>
      </div>
      <div className="flex justify-end w-full">
        <Link href={`/subscribe`}>
          <Button>
            <span className="sr-only">
              Access customer portal to manage your subscription plan
            </span>
            <span aria-hidden="true">
              {billingInfo ? "Change Plan" : "View Plans"}
            </span>
          </Button>
        </Link>
      </div>
    </DashboardCard>
  );
}
