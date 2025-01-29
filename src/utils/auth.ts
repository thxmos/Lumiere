import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { User } from "@prisma/client";
import { AUTH_COOKIE_NAME } from "@/constants/app";

/*
 * validateServerSession:
 * Use when you want to check if a user is logged in but want to handle the null case yourself
 * When you need optional authentication
 * When you want custom error handling or redirection logic
 */

export async function validateServerSession() {
  const sessionId = cookies().get(AUTH_COOKIE_NAME)?.value;

  if (!sessionId) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      user: true,
    },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session.user;
}

/*
 * requireUser:
 * Use when you want to enforce authentication for a server action
 * When you need to ensure that a user is logged in before proceeding
 * When you want to throw an error if the user is not authenticated
 */

export async function requireUser() {
  const user = await validateServerSession();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

/*
 * withAuth:
 * Use when you want to protect a server action
 */

export function withAuth<Args extends any[], Return>(
  handler: (user: User, ...args: Args) => Promise<Return>,
) {
  return async (...args: Args): Promise<Return> => {
    const user = await requireUser();
    return handler(user, ...args);
  };
}

/*
 * validateAuthPage:
 * Use when you want to protect a page
 */

export async function validateAuthPage() {
  const user = await validateServerSession();
  if (!user) {
    redirect("/auth");
  }
  return user;
}
