import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import { LinkCard } from "./link-card";
import { LinkResponse } from "@/repositories/link/types";

interface Props {
  links: LinkResponse[];
  setLinks: (links: LinkResponse[]) => void;
  onUpdate: (index: number, updatedLink: LinkResponse) => void;
  onDelete: (index: number) => void;
}

export const LinksList: React.FC<Props> = ({
  links,
  setLinks,
  onUpdate,
  onDelete,
}) => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedItems = Array.from(links);
    const [removed] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, removed);

    reorderedItems.forEach((item, index) => {
      item.index = index;
    });

    setLinks(reorderedItems);
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      autoScrollerOptions={{
        disabled: true,
      }}
    >
      <Droppable droppableId="links">
        {(droppableProvided) => (
          <ul
            className="space-y-4 min-h-[18px]"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {links.map((link, index) => (
              <Draggable
                key={link.id}
                draggableId={link?.id?.toString() || index.toString()}
                index={index}
              >
                {(draggableProvided) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    index={index}
                    draggableProvided={draggableProvided}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                  />
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
