import React from 'react';
import NextImage from 'next/image';
import { TipText, TipWrapper } from './styles';

const TipBar: React.FC<{ children }> = ({ children }) => {
  return (
    <TipWrapper>
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
