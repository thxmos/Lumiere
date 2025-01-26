import React from "react";

interface ItemCardProps {
  index: number;
  content: React.ReactNode;
  buttons: React.ReactNode;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  index,
  content,
  buttons,
}) => {
  return (
    <div className="border border-secondary hover:border-primary bg-card transition-all rounded-lg p-4 flex justify-between items-center">
      <div className="flex gap-4 items-center justify-between w-full">
        <span className="font-bold text-primary">{index + 1}</span>
        {content}
        <div className="flex items-center space-x-2">{buttons}</div>
      </div>
    </div>
  );
};
