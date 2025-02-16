import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string => {
  if (!name) return "";
  const words = name.split(" ");
  const initials = words?.map((word) => word.charAt(0).toUpperCase()).join("");
  return initials;
};
