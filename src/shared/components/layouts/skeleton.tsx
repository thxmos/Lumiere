import React from "react";

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
  className?: string;
}

const Skeleton = ({ children, isLoading, className = "" }: Props) => {
  return (
    <div
      className={`${className} ${isLoading ? '[&_*]:before:animate-pulse [&_*]:before:bg-gray-200 [&_*]:before:absolute [&_*]:before:inset-0 [&_*]:before:rounded [&_*]:relative [&_*]:before:content-[""]' : ""}`}
    >
      {children}
    </div>
  );
};

export default Skeleton;
