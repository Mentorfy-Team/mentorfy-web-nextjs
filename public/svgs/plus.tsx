import { SVGProps } from 'react';
import { DefaultProps } from './type';

const SvgComponent = ({ width, height, fill }: DefaultProps) => (
  <svg width={13} height={13} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.375 4.875h-3.25v-3.25a1.625 1.625 0 0 0-3.25 0v3.25h-3.25A1.63 1.63 0 0 0 0 6.5c0 .894.728 1.625 1.625 1.625h3.25v3.25a1.625 1.625 0 0 0 3.25 0v-3.25h3.25c.9 0 1.625-.724 1.625-1.625 0-.9-.725-1.625-1.625-1.625Z"
      fill="#fff"
    />
  </svg>
);

export default SvgComponent;
