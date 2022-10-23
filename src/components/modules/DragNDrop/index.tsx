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
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export type DnDObject = {
  id: string;
  title: string;
  description?: string;
  data?: any;
  extra?: any;
  rows?: DnDRow[];
};

export type DnDRow = MentorTools.ToolData & { type: string };

type Props = {
  model: (element_id, group_id?) => JSX.Element;
  groupModel: (group_id, child) => JSX.Element;
  elements: {
    id: string;
    rows?: DnDRow[];
  }[];
  setElements: (elements: any) => void;
};

export default function DragNDrop({
  model,
  elements,
  setElements,
  groupModel,
}: Props) {
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
        (i) => i.rows.findIndex((j) => j.id === active.id) !== -1,
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
      {elements.map((group, groupIndex) => {
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
      })}
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
