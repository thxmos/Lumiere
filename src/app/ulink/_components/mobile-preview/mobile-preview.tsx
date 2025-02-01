"use client";

import { SquareArrowUpRight } from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
  username: string; // for preview link
}

export default function MobilePreview({ children, username }: Props) {
  const pathname = usePathname();

  // Only display on links and theme editor pages
  if (pathname !== "/ulink/links" && pathname !== "/ulink/theme-editor")
    return null;

  return (
    <>
      {/* Preview container */}
      <div className="flex flex-col gap-4 justify-center items-center">
        {/* Phone border*/}
        <div className="w-[20rem] h-[40rem] bg-gray-800 rounded-[2rem] p-1 shadow-lg mx-auto">
          {/* Phone screen */}
          <div className="w-full h-full bg-white rounded-[1.9rem] overflow-hidden relative overflow-y-scroll no-scrollbar">
            {children}
          </div>
        </div>
        <Link
          href={`/${username}?preview=true`}
          className="text-base underline font-bold hover:text-primary transition-all flex items-center gap-2"
        >
          Preview
          <SquareArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
