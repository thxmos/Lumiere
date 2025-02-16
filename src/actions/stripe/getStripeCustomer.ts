"use server";

import { Stripe } from "stripe";
import { stripe } from "@/modules/shared/core/payment/stripe.utils";

export const getStripeCustomer = async (
  customerId: string,
): Promise<Stripe.Customer> => {
  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) {
    throw new Error("Customer has been deleted");
  }
  return customer as Stripe.Customer;
};
