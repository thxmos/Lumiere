"use server";

import { prisma } from "@/utils/lib/prisma";
import { getUser } from "../session";

export const deleteQRCodeAction = async (qrCodeId: string): Promise<void> => {
  await deleteQRCode(qrCodeId);
};

export async function deleteQRCode(id: string): Promise<void> {
  const { user } = await getUser();
  if (!user) {
    throw new Error("User not found");
  }
  await prisma.qRCode.delete({ where: { id, userId: user.id } });
}
