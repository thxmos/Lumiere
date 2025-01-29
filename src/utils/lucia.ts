import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "./prisma";
import {
  getSessionIdFromCookie,
  createSessionCookie,
  deleteSessionCookie,
} from "./cookies";
import type {
  SessionUser,
  SessionAttributes,
  DatabaseUserAttributes,
} from "@/types/auth";
import { COOKIE_NAME } from "@/constants/auth";

/*
Extend the "lucia" module to register custom types for the Lucia authentication library

DatabaseUserAttributes: 
Defines the shape of custom user attributes stored in the database (username, email, roles etc)

DatabaseSessionAttributes: 
Defines custom session attributes like userAgent and IP address
*/

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
    DatabaseSessionAttributes: SessionAttributes;
  }
}
const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: COOKIE_NAME,
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Controls when the cookie is sent in cross-site requests. "lax" provides a balance between security and usability - the cookie is sent for top-level navigations but blocked for cross-site subrequests
      domain: process.env.COOKIE_DOMAIN || undefined, //TODO: what is this?
      path: "/", // The path on the server in which the cookie will be sent to
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      name: attributes.name,
      avatar: attributes.avatar,
      roles: attributes.roles, //TODO: make string
      isVerified: attributes.isVerified,
    };
  },
});

// Helper functions for session management
export class AuthService {
  static async validateSession() {
    const sessionId = getSessionIdFromCookie();
    if (!sessionId) return { user: null, session: null };

    const result = await lucia.validateSession(sessionId);
    try {
      if (result.session && result.session.fresh) {
        createSessionCookie(result.session.id);
      }
      if (!result.session) {
        deleteSessionCookie();
      }
    } catch (error) {
      console.error("Error managing session cookies:", error);
    }

    return result;
  }

  static async createSession(
    userId: string,
    attributes: SessionAttributes = {},
  ) {
    const session = await lucia.createSession(userId, attributes);
    createSessionCookie(session.id);
    return session;
  }

  static async invalidateSession(sessionId: string) {
    await lucia.invalidateSession(sessionId);
    deleteSessionCookie();
  }

  static async invalidateAllUserSessions(userId: string) {
    await lucia.invalidateUserSessions(userId);
  }

  static getSessionUser(user: DatabaseUserAttributes): SessionUser {
    return {
      id: user.id,
      username: user.username,
      name: user.name || "", //TODO: clean up
      avatar: user.avatar || "", //TODO: clean up
      roles: user.roles,
      isVerified: user.isVerified,
    };
  }
}
