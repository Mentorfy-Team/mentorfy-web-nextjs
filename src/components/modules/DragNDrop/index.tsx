import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Box } from '@mui/material';

export type GroupTools = MentorTools.ToolData & {
  rows?: (MentorTools.ToolData & { rows?: any[] })[];
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
      <DragOverlay modifiers={[restrictToParentElement]}>
        {activeId ? (
          <Box
            sx={{
              backgroundColor: 'green',
              padding: '10px',
              opacity: 0.5,
            }}
          >
            Solte na nova posição
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
