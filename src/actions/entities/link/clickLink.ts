"use server";

import { LinkRepository } from "@/repositories/link/link.repository";

import { ClickRepository } from "@/repositories/click/click.repository";
import { redirect } from "next/navigation";
import { getLinkById } from "./getLinkById";
import { SessionUser } from "@/utils/lib/lucia";
import { withAuth } from "@/utils/security/auth";

/*
 * Increments click on Link entity and creates a Click entity tied to the Link
 */
export const clickLink = withAuth(
  async (user: SessionUser, id: string): Promise<void> => {
    const link = await getLinkById(id);
    if (!link) {
      throw new Error("Link not found with id: " + id);
    }

    const linkRepository = new LinkRepository();
    await linkRepository.update(id, { clicks: { increment: 1 } });

    const clickRepository = new ClickRepository();
    await clickRepository.create({
      link: { connect: { id } },
    });

    redirect(link.url);
  },
);
