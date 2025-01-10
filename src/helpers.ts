export const getInitials = (name: string): string => {
  if (!name) return "";
  const words = name.split(" ");
  const initials = words?.map((word) => word.charAt(0).toUpperCase()).join("");
  return initials;
};
