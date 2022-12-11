import Image from 'next/image';
import React from 'react';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';

function Arrow({
  children,
  disabled,
  onClick,
  isLeft = false,
}: {
  children: React.ReactNode;
  disabled: boolean;
  isLeft?: boolean;
  onClick: VoidFunction;
}) {
  const position = isLeft ? { left: 0 } : { right: 0 };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        ...position,
        backgroundColor: '#00000044',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        opacity: disabled ? '0' : '1',
        userSelect: 'none',
        position: 'absolute',
        border: 'none',
        zIndex: 9999,
      }}
    >
      {children}
    </button>
  );
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleElements, initComplete } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible),
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <Arrow isLeft disabled={disabled} onClick={() => scrollPrev()}>
      <Image
        alt=""
        style={{
          transform: 'rotate(180deg)',
        }}
        width={15}
        height={15}
        src="/svgs/arrow-right.svg"
      />
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible,
  );
  React.useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      <Image alt="" width={15} height={15} src="/svgs/arrow-right.svg" />
    </Arrow>
  );
}
