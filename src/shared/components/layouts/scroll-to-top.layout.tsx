"use client";

import { useScrollToTop } from "@hooks/useScrollToTop";

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
