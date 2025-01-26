"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
  username: string;
}

const MobilePreview: React.FC<Props> = ({ children, username }) => {
  const pathname = usePathname();

  if (pathname !== "/dashboard/links" && pathname !== "/dashboard/theme-editor")
    return null;

  return (
    <>
      {/* Preview container */}
      <div className="flex flex-col gap-4 justify-center items-center">
        {/* Phone border*/}
        <div className="w-[20rem] h-[40rem] bg-gray-800 rounded-[2rem] p-1 shadow-lg mx-auto">
          {/* Phone screen */}
          <div className="w-full h-full bg-white rounded-[1.9rem] overflow-hidden relative overflow-y-scroll">
            {children}
          </div>
        </div>
        <Link href={`/${username}`} className="text-base underline">
          Preview
        </Link>
      </div>
    </>
  );
};

export default MobilePreview;
