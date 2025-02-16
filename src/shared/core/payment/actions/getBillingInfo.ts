"use server";

import { getSubscriptionByUserId } from "@/shared/core/payment/actions/getSubscriptionByUserId";

export async function getBillingInfo(userId: string) {
  try {
    const subscription = await getSubscriptionByUserId(userId);
    return subscription;
  } catch (error) {
    console.error(error);
    return null;
  }
}
