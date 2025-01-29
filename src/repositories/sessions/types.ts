import { Prisma, Session } from "@prisma/client";
import { IBaseRepository } from "../types";

export type SessionCreateInput = Prisma.SessionCreateInput;
export type SessionUpdateInput = Prisma.SessionUpdateInput;
export type SessionWhereInput = Prisma.SessionWhereInput;

export type SessionResponse = Omit<Session, "id">;

export interface ISessionRepository
  extends IBaseRepository<
    SessionResponse,
    SessionCreateInput,
    SessionUpdateInput
  > {
  findById(id: string): Promise<SessionResponse | null>;
  findAll(): Promise<SessionResponse[]>;
  create(data: SessionCreateInput): Promise<SessionResponse>;
  update(id: string, data: SessionUpdateInput): Promise<SessionResponse>;
  delete(id: string): Promise<void>;
}
