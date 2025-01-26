import { Image } from "@prisma/client";

export type ImageDto = Omit<Image, "id">;
export type ImageDtoWithId = Image;
