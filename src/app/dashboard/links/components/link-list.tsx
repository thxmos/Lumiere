import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import { LinkDto } from "@/data-access/links";
import LinkItem from "./link-item";

interface Props {
  links: LinkDto[];
  setLinks: (links: LinkDto[]) => void;
  onUpdate: (index: number, updatedLink: LinkDto) => void;
  onDelete: (index: number) => void;
  moveLink: (index: number, direction: "up" | "down") => void;
}

const LinkList: React.FC<Props> = ({
  links,
  setLinks,
  onUpdate,
  onDelete,
  moveLink,
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
              <Draggable key={link.id} draggableId={link.id} index={index}>
                {(draggableProvided) => (
                  <LinkItem
                    link={link}
                    index={index}
                    draggableProvided={draggableProvided}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    moveLink={moveLink}
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

export default LinkList;
