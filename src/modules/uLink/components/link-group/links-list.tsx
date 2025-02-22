import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import { LinkCard } from "./link-card";
import { LinkResponse } from "@core/db/repositories/link";
import { useLinksStore } from "@stores/old/links";

interface Props {
  onUpdate: (index: number, updatedLink: LinkResponse) => void;
  onDelete: (index: number) => void;
  insertAssetMap: (id: string, file: File) => void;
  setIsEditingAnyLink: (isEditing: boolean) => void;
}

export const LinksList: React.FC<Props> = ({
  onUpdate,
  onDelete,
  insertAssetMap,
  setIsEditingAnyLink,
}) => {
  const { links, setLinks } = useLinksStore();

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
            className="min-h-[18px]"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {links.map((link, index) => (
              <Draggable key={link.id} draggableId={link.id} index={index}>
                {(draggableProvided) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    index={index}
                    draggableProvided={draggableProvided}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    insertAssetMap={insertAssetMap}
                    setIsEditingAnyLink={setIsEditingAnyLink}
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
