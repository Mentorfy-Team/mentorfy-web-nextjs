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
  id: number;
  title: string;
  description: string;
  rows: DnDRow[];
};

export type DnDRow = MentorTools.ToolData & { type: string };

type Props = {
  model: (element_id, group_id?) => JSX.Element;
  groupModel: (group_id, child) => JSX.Element;
  elements: {
    id: number;
    rows: DnDRow[];
  }[];
  setElements: (elements: any) => void;
};

export default function DragNDrop({ model, elements, setElements, groupModel }: Props) {
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
      setElements((items: { rows: any[] }[]) => {
        const oldIndex = items[0].rows.findIndex((i) => i.id === active.id);
        const newIndex = items[0].rows.findIndex((i) => i.id === over.id);
        const newItens = [...items];
        newItens[0].rows = arrayMove(items[0].rows, oldIndex, newIndex);
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
        return groupModel(group.id, (<SortableContext
          items={(elements[0].rows || []).filter((i)=>!i.delete).map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {(elements[0].rows || []).filter((i)=>!i.delete).map((item) => model(item.id))}
        </SortableContext>));
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
