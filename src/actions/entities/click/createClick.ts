"use server";

import { type BrowserData } from "@/types/clicks";
import { Country } from "@prisma/client";
import { clickRepository } from "@/repositories/click";

export const createClick = async (linkId: string, data: BrowserData) => {
  await clickRepository.create({
    link: {
      connect: {
        id: linkId,
      },
    },
    ...data,
    country: data.country as Country,
  });
};
