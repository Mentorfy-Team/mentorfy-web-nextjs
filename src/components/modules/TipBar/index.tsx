import React from 'react';
import NextImage from 'next/image';
import { TipText, TipWrapper } from './styles';

const TipBar: React.FC<{ children; left?; sx?; error? }> = ({
  children,
  sx,
  left = true,
  error = false,
}) => {
  return (
    <TipWrapper
      error={error}
      sx={
        left
          ? {
              ...sx,
              textAlign: 'left',
            }
          : { ...sx }
      }
    >
      <NextImage
        alt="tip-icon"
        src="/svgs/tip-icon.svg"
        width={22}
        height={22}
      />
      <TipText>{children}</TipText>
    </TipWrapper>
  );
};

export default TipBar;
