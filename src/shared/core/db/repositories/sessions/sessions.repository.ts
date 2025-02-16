import { Prisma, Session } from "@prisma/client";
import { prisma } from "@/shared/core/db/prisma";
import { NotFoundError, DuplicateError, RepositoryError } from "../errors";
import {
  ISessionRepository,
  SessionResponse,
  SessionCreateInput,
  SessionUpdateInput,
} from "./types";

export class SessionRepository implements ISessionRepository {
  private removePrivateFields(session: Session): SessionResponse {
    const { id, ...sessionResponse } = session;
    return sessionResponse;
  }

  async findById(id: string): Promise<SessionResponse | null> {
    try {
      const session = await prisma.session.findUnique({ where: { id } });
      return session ? this.removePrivateFields(session) : null;
    } catch (error) {
      throw new RepositoryError("Failed to fetch session by id", error);
    }
  }

  async findAll(): Promise<SessionResponse[]> {
    try {
      const sessions = await prisma.session.findMany();
      return sessions.map(this.removePrivateFields);
    } catch (error) {
      throw new RepositoryError("Failed to fetch all sessions", error);
    }
  }

  async create(data: SessionCreateInput): Promise<SessionResponse> {
    try {
      const session = await prisma.session.create({
        data: {
          ...data,
        },
      });
      return this.removePrivateFields(session);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Session",
            field,
            data[field as keyof SessionCreateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to create session", error);
    }
  }

  async update(id: string, data: SessionUpdateInput): Promise<SessionResponse> {
    try {
      const session = await prisma.session.update({
        where: { id },
        data,
      });
      return this.removePrivateFields(session);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") throw new NotFoundError("Session", id);
        if (error.code === "P2002") {
          const field = (error.meta?.target as string[])[0];
          throw new DuplicateError(
            "Session",
            field,
            data[field as keyof SessionUpdateInput] as string,
          );
        }
      }
      throw new RepositoryError("Failed to update session", error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.session.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundError("Session", id);
        }
      }
      throw new RepositoryError("Failed to delete session", error);
    }
  }
}
