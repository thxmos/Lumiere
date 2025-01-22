import { prisma } from "@/utils/prisma";
import { Session } from "@prisma/client";

// todo: can lucia handle this?
export const deleteSession = async (id: string): Promise<Session> => {
  return prisma.session.delete({ where: { id } });
};
