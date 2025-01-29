import { PasswordResetToken, Session, VerificationToken } from "@prisma/client";
import { Role } from "@prisma/client";
//TODO: use this role for sessionUser

export interface SessionUser {
  id: string;
  username: string;
  name: string;
  avatar: string;
  roles: string; // TODO: make this a list of roles
  isVerified: boolean;
}

export interface SessionAttributes {
  // Custom session attributes
  userAgent?: string;
  ipAddress?: string;
  lastActive?: Date;
}

export interface DatabaseUserAttributes {
  id: string;
  username: string;
  name: string | null;
  email: string;
  avatar: string | null;
  roles: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type PasswordResetTokenDto = Omit<PasswordResetToken, "id">;
export type PasswordResetTokenDtoWithId = PasswordResetToken;

export type SessionDto = Omit<Session, "id">;
export type SessionDtoWithId = Session;

export type VerificationTokenDto = Omit<VerificationToken, "id">;
export type VerificationTokenDtoWithId = VerificationToken;
