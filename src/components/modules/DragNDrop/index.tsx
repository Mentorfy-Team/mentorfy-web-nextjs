import React, { useState } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

export type GroupTools = MentorTools.ToolData & {
  rows?: (Partial<MentorTools.ToolData> & { rows?: any[] })[];
};

type Props = {
  elements: any;
  setElements: (elements: any) => void;
};

export default function DragNDrop({ elements, setElements }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const [activeId, setActiveId] = useState(null);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    setActiveId(null);
    const { active, over } = event;
    if (active.id !== over?.id) {
      const index = elements.findIndex(
        (i) => i.rows?.findIndex((j) => j.id === active.id) !== -1,
      );
      setElements((steps: { rows: any[] }[]) => {
        const oldIndex = steps[index].rows.findIndex((i) => i.id === active.id);
        const newIndex = steps[index].rows.findIndex((i) => i.id === over.id);
        const newItens = [...steps];
        newItens[index].rows = arrayMove(steps[index].rows, oldIndex, newIndex);
        return newItens;
      });
    }
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      {elements}
      {/* {elements
        .filter((i) => !i.delete)
        .map((group, groupIndex) => {
          const itens = group.rows.filter((i) => !i.delete);
          return groupModel(
            group.id,
            <SortableContext
              items={itens.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {itens.map((item) => model(item))}
            </SortableContext>,
          );
        })} */}
      {/* <DragOverlay modifiers={[restrictToParentElement]}>
        {activeId ? (
          <Box
            sx={{
              backgroundColor: 'red',
              padding: '10px',
              opacity: 0.1,
            }}
          >
            helloworld
          </Box>
        ) : null}
      </DragOverlay> */}
    </DndContext>
  );
}
