import { DefaultProps } from './type';

const SvgComponent = ({ width, height, fill }: DefaultProps) => (
  <svg width={20} height={13} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 0h-4.8v6.4L10 4.8 6.8 6.4V0H2A1.6 1.6 0 0 0 .4 1.6v9.6A1.6 1.6 0 0 0 2 12.8h16a1.6 1.6 0 0 0 1.6-1.6V1.6A1.6 1.6 0 0 0 18 0Z"
      fill="#FFF"
    />
  </svg>
);

export default SvgComponent;
