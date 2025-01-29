import { prisma } from "@/utils/lib/prisma";
import { Link } from "@prisma/client";

export type CreateLinkDto = {
  url: string;
  title: string;
  imageUrl: string;
  userId: string;
  index: number;
};

export type LinkDto = {
  id: string;
  url: string;
  title: string;
  imageUrl: string | null;
  clicks?: number;
  userId: string;
  index: number | null;
  active: boolean;
};

function toDtoMapper(link: Link): LinkDto {
  return {
    id: link.id,
    url: link.url,
    title: link.title,
    imageUrl: link.imageUrl,
    userId: link.userId,
    index: link.index,
    active: link.active,
  };
}

export async function createLink(data: CreateLinkDto): Promise<LinkDto> {
  const userLinks = await getLinksByUserId(data.userId);
  if (userLinks.length < 10) {
    const createdLink = await prisma.link.create({ data });
    return toDtoMapper(createdLink);
  } else {
    throw new Error("You have reached the maximum number of links");
  }
}

export async function createLinks(data: CreateLinkDto[]): Promise<void> {
  await prisma.link.createMany({ data });
}

export async function updateLink(
  id: string,
  data: Partial<Link>,
): Promise<void> {
  await prisma.link.update({ where: { id }, data });
}

export async function updateLinks(data: LinkDto[]): Promise<void> {
  // updateMany() doesn't work here because we need to update each link individually
  // with its specific id and data
  for (const link of data) {
    await prisma.link.update({
      where: { id: link.id },
      data: link,
    });
  }
  // const updatedLinks = await prisma.link.findMany({
  //   where: {
  //     userId: data[0].userId,
  //   },
  // });
  // return updatedLinks.map(toDtoMapper);
}

export async function getLinksByUserId(userId: string): Promise<LinkDto[]> {
  const links = await prisma.link.findMany({ where: { userId } });
  return links.map(toDtoMapper);
}

export async function getLinkById(id: string): Promise<LinkDto> {
  const foundLink = await prisma.link.findUnique({
    where: { id },
  });
  if (!foundLink) {
    throw new Error("Link not found with id: " + id);
  }
  return toDtoMapper(foundLink);
}

export async function updateLinkById(
  id: string,
  data: Partial<Link>,
): Promise<void> {
  await prisma.link.update({ where: { id }, data });
}

export async function deleteLinkById(id: string): Promise<void> {
  await prisma.link.delete({ where: { id } });
}
