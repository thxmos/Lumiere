"use client";

import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const MobilePreview: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();

  if (pathname !== "/dashboard/links" && pathname !== "/dashboard/theme-editor")
    return null;

  return (
    <div className="w-64 h-[500px] bg-gray-800 rounded-[2rem] p-1 shadow-lg mx-auto">
      <div className="w-full h-full bg-white rounded-[1.9rem] overflow-hidden relative">
        <div className="w-full h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default MobilePreview;
