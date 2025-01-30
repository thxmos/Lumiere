"use server";

import { redirect } from "next/navigation";
import { getLinkById } from "./getLinkById";
import { linkRepository } from "@/repositories/link";
import { clickRepository } from "@/repositories/click";

/*
 * Increments click on Link entity and creates a Click entity tied to the Link
 */
export const clickLink = async (id: string): Promise<void> => {
  const link = await getLinkById(id);
  if (!link) {
    throw new Error("Link not found with id: " + id);
  }

  await linkRepository.update(id, { clicks: { increment: 1 } });

  await clickRepository.create({
    link: { connect: { id } },
  });

  redirect(link.url);
};
