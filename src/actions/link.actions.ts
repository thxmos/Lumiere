import { getLinkById, updateLink } from "@/data-access/links";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export async function clickLink(id: string): Promise<void> {
  const link = await getLinkById(id);
  if (!link) {
    throw new Error("Link not found with id: " + id);
  }
  await prisma.link.update({
    where: { id },
    data: { clicks: { increment: 1 } },
  });
  redirect(link.url);
}

export async function updateLinkActive(id: string, active: boolean) {
  await updateLink(id, { active });
}
