import { PasswordResetToken, Session, VerificationToken } from "@prisma/client";

export type PasswordResetTokenDto = Omit<PasswordResetToken, "id">;
export type PasswordResetTokenDtoWithId = PasswordResetToken;

export type SessionDto = Omit<Session, "id">;
export type SessionDtoWithId = Session;

export type VerificationTokenDto = Omit<VerificationToken, "id">;
export type VerificationTokenDtoWithId = VerificationToken;
