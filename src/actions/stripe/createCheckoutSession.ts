"use server";

import { createStripeCheckoutSession } from "@/actions/stripe/createStripeCheckoutSession";
import { getStripeCustomer } from "@/actions/stripe/getStripeCustomer";
import { getUserById } from "@/actions/entities/User/getUserById";
import { Price } from "@prisma/client";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";

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
      const userFromDb = await getUserById(user.id);

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
