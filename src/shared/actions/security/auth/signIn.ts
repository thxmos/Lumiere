"use server";

import { SignInSchema } from "@/app/(auth)/auth/components/sign-in-form";
import { lucia } from "@core/auth/lucia";
import { prisma } from "@core/db/prisma";
import { createAndSetSessionCookie } from "@utils/security/cookies";
import { Argon2id } from "oslo/password";

export const signIn = async (values: SignInSchema) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: values.email.toLowerCase(),
      },
    });

    if (!user || !user.password)
      return { error: "Invalid Credentials", success: false };

    const passwordMatch = await new Argon2id().verify(
      user.password,
      values.password,
    );
    if (!passwordMatch) return { error: "Invalid Credentials", success: false };

    if (!user.isVerified) {
      return { error: "Please verify your email to login.", success: false };
    }

    const session = await lucia.createSession(user.id, {});
    createAndSetSessionCookie(session.id);
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
};
