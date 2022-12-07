import React, { useCallback, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { CSS } from '@dnd-kit/utilities';

export type GroupTools = MentorTools.ToolData & {
  rows?: (MentorTools.ToolData & { rows?: any[] })[];
};

type Props<T> = {
  elements: T[];
  childrenName?: string;
  setElements: (elements: any) => void;
};

function Droppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div style={props.style} ref={setNodeRef}>
      {props.children}
    </div>
  );
}

function Draggable(props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef}>
      <div {...listeners} {...attributes}>
        {props.children}
      </div>
    </div>
  );
}

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    ...props.style,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={'pos-relative'}
    >
      {props.children}
    </div>
  );
}

export default function DragNDrop<T>({
  elements,
  setElements,
  childrenName = 'rows',
}: Props<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const [activeId, setActiveId] = useState(null);

  function handleDragStart(event) {
    console.log('active: ', event.active);
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    setActiveId(null);
    const { active, over } = event;
    if (active.id !== over?.id) {
      //elements.find((i) => i.rows?.find((j) => j.id === active.id));
      console.log('elements', elements);
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

  const lookForChild = useCallback((elements, index) => {
    if (!elements || elements?.length === 0) return null;

    const childrenParent = [];

    for (let ind = 0; ind < elements.length; ind++) {
      const children = [...(elements[ind]?.rows || [])];

      const found = lookForChild(children, index + ind);
      console.log(index, ind);
      if (found) {
        childrenParent.push(found);
      }
    }

    return elements.map((el) => (
      <SortableItem
        key={el.id}
        style={{
          margin: '10px',
          padding: '5px',
          textAlign: 'left',
          backgroundColor: ('#' + index).padEnd(7, '0'),
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {index} Sortable
        {childrenParent}
      </SortableItem>
    ));
  }, []);

  const DragableComponents = useCallback(() => {
    const dropables = [];
    let index = 0;
    for (let ind = 0; ind < elements.length; ind++) {
      index++;
      const children = [...(elements[ind][childrenName] || [])];
      dropables.push(
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={children?.map((el) => el.id) || []}
        >
          <div
            style={{
              margin: '10px',
              padding: '5px',
              textAlign: 'left',
              backgroundColor: 'red',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {elements[ind].id} - Step SortableContext {ind}
            {lookForChild(children, index)}
          </div>
        </SortableContext>,
      );
    }

    return <>{dropables}</>;
  }, [childrenName, elements, lookForChild]);

  return (
    <DndContext
      //onDragStart={handleDragStart}
      sensors={sensors}
      collisionDetection={closestCenter}
      //onDragEnd={handleDragEnd}
      // modifiers={[restrictToParentElement]}
    >
      <div
        id="1"
        style={{
          backgroundColor: '#d8258e',
        }}
      >
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={elements.map((el) => el.id)}
        >
          <DragableComponents />
        </SortableContext>
      </div>
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
