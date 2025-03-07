"use server";

import { lucia } from "@core/auth/lucia";
import { SessionRepository } from "@core/db/repositories/sessions/sessions.repository";
import { deleteSessionCookie } from "@utils/security/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) redirect("/auth");

  const sessionRepository = new SessionRepository();

  await sessionRepository.delete(sessionId);
  deleteSessionCookie();

  redirect("/");
};
