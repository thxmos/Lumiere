import { User as PrismaUser } from "@prisma/client";
export type User = Omit<PrismaUser, "password">;
export type UserWithId = User & { id: string };
