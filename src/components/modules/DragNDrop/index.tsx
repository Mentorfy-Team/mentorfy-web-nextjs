import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { resetServerContext } from 'react-beautiful-dnd';

export type DnDObject = {
  id: number;
  rows: DnDRow[],
};

export type DnDRow = {
  id: number;
  title: string;
  description: string;
  type: string;
  data: any;
};

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list:DnDObject, startIndex, endIndex) => {
  const result = {...list};
  const [removed] = result.rows.splice(startIndex, 1);
  result.rows.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#212121' : 'transparent',
  width: '100%',
});

type Props = {
  model: (element_id, group_id?) => JSX.Element;
  elements: any[];
}

export default function DragNDrop({model, elements}: Props) {
  const [state, setState] = useState<any[]>([]);

  const onDragEnd = useCallback(
    (_result) => {
      const { source, destination } = _result;

      // dropped outside the list
      if (!destination) {
        return;
      }

      const sInd = source.droppableId;
      const dInd = destination.droppableId;

      console.log(sInd, dInd);
      if (sInd === dInd) {
        const items = reorder(state[sInd], source.index, destination.index);
        const newState = [...state];
        newState[sInd] = items;
        setState(newState);
      } else {
        const result = move(state[sInd], state[dInd], source, destination);
        const newState = [...state];
        newState[sInd] = result[sInd];
        newState[dInd] = result[dInd];

        setState(newState.filter((group) => group.length));
      }
    },
    [state],
  );

  useEffect(()=>{
    if(elements){
      const newState = [...elements];
      setState(newState);
    }
  },[elements]);

  resetServerContext();
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={`${ind}`} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.rows?.map((item, index) => {
                    console.log(item, index);
                    return (
                    <Draggable
                      key={item.id}
                      draggableId={`${item.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                          )}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-around',
                            }}
                          >
                            {model(item.id)}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );})}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
