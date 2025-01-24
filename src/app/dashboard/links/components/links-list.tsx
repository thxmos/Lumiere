import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import { LinkDto } from "@/data-access/links";
import { LinkCard } from "./link-card";
import { updateUserLinksAction } from "../links-card.actions";
import { toast } from "sonner";

interface Props {
  links: LinkDto[];
  setLinks: (links: LinkDto[]) => void;
  onUpdate: (index: number, updatedLink: LinkDto) => void;
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
    try {
      updateUserLinksAction(reorderedItems); //TODO: make it so only indexes update
      toast.success("Link order updated successfully", {
        duration: 3000,
      });
    } catch (error) {
      toast.error("Failed to update link order", {
        duration: 3000,
      });
      console.error("Failed to update link order:", error);
    }
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
                  <LinkCard
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
