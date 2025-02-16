import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/modules/shared/core/db/prisma";
import { AUTH_COOKIE_NAME } from "@/config/constants/app";
import { SessionUser } from "@/core/auth/lucia";

/*
 * validateServerSession:
 * Use when you want to check if a user is logged in but want to handle the null case yourself
 * When you need optional authentication
 * When you want custom error handling or redirection logic
 */

export const validateServerSession = async () => {
  const sessionId = cookies().get(AUTH_COOKIE_NAME)?.value;

  if (!sessionId) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          name: true,
          avatar: true,
          roles: true,
        },
      },
    },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session.user as SessionUser;
};

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
  handler: (user: SessionUser, ...args: Args) => Promise<Return>,
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
  return user as SessionUser;
}
