import {css} from '@emotion/react';

const mq = ({cssBlock, minWidth}: {
  cssBlock: any;
  minWidth: number;
}) => css`
  @media (min-width: ${minWidth}px) {
    ${cssBlock}
  }
`;

export const mqTablet = (cssBlock: any) => mq({
  cssBlock,
  minWidth: 768,
});

export const mqDesktop = (cssBlock: any) => mq({
  cssBlock,
  minWidth: 1080,
});
