"use server";

import { Price } from "@prisma/client";
import { withAuth } from "@/shared/utils/security/auth";
import { SessionUser } from "@/shared/core/auth/lucia";
import { createStripeCheckoutSession } from "./createStripeCheckoutSession";
import { getCurrentUser } from "@/shared/actions/entities/user/getCurrentUser";
import { getStripeCustomer } from "./getStripeCustomer";

export type Subscription = {
  id: string;
  currency: string;
  current_period_end: number;
  current_period_start: number;
  status: string;
  start_date: number;
  billing_cycle: string;
  interval: string;
};

export const createCheckoutSession = withAuth(
  async (
    user: SessionUser,
    price: Price,
    quanity: number,
  ): Promise<{ success: boolean; sessionId?: string; message?: string }> => {
    try {
      const userFromDb = await getCurrentUser();

      if (!userFromDb || !userFromDb.stripeCustomerId) {
        throw new Error("User not found or no stripe customer id");
      }

      const customer = await getStripeCustomer(userFromDb.stripeCustomerId);

      const session = await createStripeCheckoutSession(
        customer.id,
        price.stripePriceId!,
        quanity,
      );

      return { success: true, sessionId: session.id };
    } catch (error) {
      return { success: false, message: "Failed to create checkout session." };
    }
  },
);
