import { Click } from "@prisma/client";

export type ClicksDto = Omit<Click, "id">;
export type ClickDtoWithId = Click;
