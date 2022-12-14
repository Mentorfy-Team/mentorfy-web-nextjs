import dynamic from 'next/dynamic';
import { DraggableEvent } from 'react-draggable';
import { DraggableItem, SizeButton } from '../styles';

const Draggable = dynamic(() => import('react-draggable'), { ssr: false });

type Props = {
  element: (value) => JSX.Element;
  showBorder: boolean;
  fontSize: number;
  onStopDrag: (e: DraggableEvent) => void;
  onSizeChange: (value) => void;
};

export const DragBox = ({
  element,
  showBorder,
  fontSize,
  onStopDrag,
  onSizeChange,
}: Props) => {
  return (
    <Draggable bounds="parent" onStop={(e) => onStopDrag(e)}>
      <DraggableItem
        sx={{
          border: `${showBorder && '1px dotted black'}`,
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
          id="BoxDrag"
        >
          <SizeButton
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onSizeChange(fontSize - 1);
            }}
          >
            -
          </SizeButton>
          {element(fontSize + 'px')}
          <SizeButton
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onSizeChange(fontSize + 1);
            }}
          >
            +
          </SizeButton>
        </div>
      </DraggableItem>
    </Draggable>
  );
};
