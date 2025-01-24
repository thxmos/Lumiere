"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
Annoying method needed because of the way the layouts are structured.
Since the navbar and sidebar are fixed and only the right content section is scrollable, the main layout cuts off the overflow content.
The links page is forcing the page down on render and it cuts the top of the page off + you can't scroll to the top.
It happens if you're scrolled down a dashboard page with sections that overflow. Temp fix for now (hopefully) since this is really ineffecient
*/

export function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
