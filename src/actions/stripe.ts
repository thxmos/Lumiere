"use server";

import { createStripeCheckoutSession } from "@/actions/stripe/stripe.checkout.sessions";
import { getStripeCustomer } from "@/actions/stripe/stripe.customers";
import { getUserById } from "@/actions/entities/user/user";
import { Price } from "@prisma/client";
import { getUser } from "./entities/session";

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

export const createCheckoutSession = async (
  price: Price,
  quanity: number,
): Promise<{ success: boolean; sessionId?: string; message?: string }> => {
  try {
    const { user: luciaUser } = await getUser();

    if (!luciaUser) {
      return { success: false };
    }

    const user = await getUserById(luciaUser.id);

    if (!user || !user.stripeCustomerId) {
      throw new Error("User not found or no stripe customer id");
    }

    const customer = await getStripeCustomer(user.stripeCustomerId);

    const session = await createStripeCheckoutSession(
      customer.id,
      price.stripePriceId!,
      quanity,
    );

    return { success: true, sessionId: session.id };
  } catch (error) {
    return { success: false, message: "Failed to create checkout session." };
  }
};
