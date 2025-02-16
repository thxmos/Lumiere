import { lucia } from "@/shared/core/auth/lucia";
import { cookies } from "next/headers";

export const getSessionIdFromCookie = () => {
  console.log("cookies", cookies().get(lucia.sessionCookieName));
  return cookies().get(lucia.sessionCookieName)?.value || null;
};

// createAndSetSessionCookie
// Create a lucia session cookie and set it in the cookies

export const createAndSetSessionCookie = (sessionId: string) => {
  const sessionCookie = lucia.createSessionCookie(sessionId);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return sessionCookie;
};

export const deleteSessionCookie = () => {
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};
