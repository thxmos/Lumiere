import { Asset } from "@prisma/client";

export type ImageDto = Omit<Asset, "id">;
export type ImageDtoWithId = Asset;
