import Draggable from 'react-draggable';
import { DraggableItem } from '../styles';

type Props = {
  element: JSX.Element;
  showBorder: boolean;
  onStopDrag: (e: any) => void;
};

export const DragBox = ({ element, showBorder, onStopDrag }: Props) => {
  return (
    <Draggable bounds="parent" onStop={(e) => onStopDrag(e)}>
      <DraggableItem
        sx={{
          border: `${showBorder && '1px dotted black'}`,
        }}
      >
        {element}
      </DraggableItem>
    </Draggable>
  );
};
