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
  position: { pageX: string; pageY: string; fontSize? };
};

export const DragBox = ({
  element,
  showBorder,
  fontSize,
  onStopDrag,
  onSizeChange,
  position = { pageX: '0', pageY: '0' },
}: Props) => {
  return (
    <Draggable
      defaultPosition={{
        x: parseInt(position.pageX),
        y: parseInt(position.pageY),
      }}
      bounds="parent"
      onStop={(e) => onStopDrag(e)}
    >
      <DraggableItem>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
          }}
          id="BoxDrag"
        >
          <div
            style={{
              marginInlineEnd: 'auto',
            }}
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
          {element(fontSize + 'px')}
        </div>
      </DraggableItem>
    </Draggable>
  );
};
