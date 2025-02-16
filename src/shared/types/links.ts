import { Link } from "@prisma/client";

export type LinkDto = Omit<Link, "id">;
export type LinkDtoWithId = Link;
