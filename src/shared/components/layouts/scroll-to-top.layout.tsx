"use client";

import { useScrollToTop } from "@/shared/hooks/ui/useScrollToTop";

/*
Refer to hook method above ^ on why we need this dumb component
*/

export const ScrollToTopLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useScrollToTop();
  return <>{children}</>;
};
