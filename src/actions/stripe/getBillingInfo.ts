"use server";

import { getSubscriptionByUserId } from "@/actions/stripe/getSubscriptionByUserId";

export async function getBillingInfo(userId: string) {
  try {
    const subscription = await getSubscriptionByUserId(userId);
    return subscription;
  } catch (error) {
    console.error(error);
    return null;
  }
}
