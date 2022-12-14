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
import Box from '@mui/material/Box';

export type GroupTools = MentorTools.ToolData & {
  rows?: (MentorTools.ToolData & { rows?: any[] })[];
};

type Props = {
  elements: any;
  steps: any;
  setElements: (elements: any) => void;
  allowOverlay?: boolean;
};

export default function DragNDrop({
  elements,
  steps,
  setElements,
  allowOverlay = false,
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
    const tool: GroupTools = active?.data?.current;

    if (active.id !== over?.id && tool) {
      const newItens = [...steps];

      // Se o pai tiver um pai, é porque tool é filho de uma categoria.
      if (tool.parent_tool?.parent) {
        const granFatherIndex = newItens.findIndex((i) =>
          i.rows.find((j) => j.id === tool.parent),
        );
        const fatherIndex = newItens[granFatherIndex].rows.findIndex(
          (i) => i.id === tool.parent,
        );
        const rowsToOrganize = newItens[granFatherIndex].rows[fatherIndex].rows;

        const oldIndex = rowsToOrganize.findIndex((i) => i.id === active.id);
        const newIndex = rowsToOrganize.findIndex((i) => i.id === over.id);

        newItens[granFatherIndex].rows = newItens[granFatherIndex].rows.map(
          (father, index) => {
            const newFather = { ...father };

            if (index === fatherIndex) {
              newFather.rows = arrayMove(rowsToOrganize, oldIndex, newIndex);
            }

            return newFather;
          },
        );
      } else {
        // move etapa
        const granFatherIndex = newItens.findIndex((i) => i.id === tool.parent);
        const rowsToOrganize = newItens[granFatherIndex].rows;

        const oldIndex = rowsToOrganize.findIndex((i) => i.id === active.id);
        const newIndex = rowsToOrganize.findIndex((i) => i.id === over.id);

        newItens[granFatherIndex].rows = arrayMove(
          rowsToOrganize,
          oldIndex,
          newIndex,
        );
      }
      setElements(newItens);
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
      {allowOverlay && (
        <DragOverlay modifiers={[restrictToParentElement]}>
          {activeId ? (
            <Box
              sx={{
                backgroundColor: 'green',
                padding: '10px',
                opacity: 0.8,
              }}
            >
              Solte na nova posição
            </Box>
          ) : null}
        </DragOverlay>
      )}
    </DndContext>
  );
}
