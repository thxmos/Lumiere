"use server";

import { SignUpSchema } from "@/app/(auth)/auth/components/sign-up-form";
import { hash } from "@/utils/security/crypto";
import { getUserByEmail } from "@/shared/actions/entities/user/getUserByEmail";
import { createUser } from "@/shared/actions/entities/user/createUser";
import { sendVerifyEmail } from "@/shared/core/email/actions/sendVerifyEmail";
import { updateUserById } from "@/shared/actions/entities/user/updateUserById";
import { createStripeCustomer } from "@/shared/actions/stripe/createStripeCustomer";

export const signUp = async (values: SignUpSchema) => {
  const { email, name, password } = values;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) return { error: "User already exists", success: false };

    const hashedPassword = await hash(password);

    // Create user in the database
    const user = await createUser({
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
    });

    const stripeCustomer = await createStripeCustomer(
      user.email,
      user.name ?? "",
    );

    if (stripeCustomer.id !== undefined) {
      await updateUserById(user.id, { stripeCustomerId: stripeCustomer.id });
    } else {
      console.error("Failed to create Stripe customer for user", user);
    }

    // Send verification email
    await sendVerifyEmail(user.email);

    return {
      user: { ...user, stripeCustomerId: stripeCustomer.id },
      success: true,
    };
  } catch (error) {
    console.error("SignUp error:", error);
    return { error: "Something went wrong", success: false };
  }
};
