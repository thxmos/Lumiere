"use server";

import WelcomeEmail from "@/emails/welcome";
import { getUserByEmail } from "../entities/user/getUserByEmail";
import { createVerificationToken } from "../security/auth/tokens/verification-token";
import { APP_NAME } from "@/constants/app";
import { resend } from "@/utils/lib/resend";

// Used in sign up flow
export const sendVerifyEmail = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) return { error: "User not found", status: 404 };
  const { token } = await createVerificationToken(user.id);

  //todo: refactor email sending to a shared function
  const res = await sendVerificationEmail(user.email, token, user.name ?? "");

  return res;
};

const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string,
) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_URL}/verify-email?token=${token}`;

  const fromEmail =
    process.env.NODE_ENV === "production"
      ? `${APP_NAME} <no-reply@${process.env.NEXT_PUBLIC_URL}>`
      : "onboarding@resend.dev";

  const res = await resend.emails.send({
    to: email,
    from: fromEmail,
    subject: `Verify your account - ${APP_NAME}`,
    react: WelcomeEmail({ url: verificationUrl, name }),
  });
};
