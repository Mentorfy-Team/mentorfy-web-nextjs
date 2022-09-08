import { DefaultProps } from './type';

const SvgComponent = ({ width, height, fill }: DefaultProps) => (
  <svg width={32} height={26} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)" fill={fill ? fill : '#7D7D7D'}>
      <path d="M24 0h-4.8v6.4L16 4.8l-3.2 1.6V0H8a1.6 1.6 0 0 0-1.6 1.6v9.6A1.6 1.6 0 0 0 8 12.8h16a1.6 1.6 0 0 0 1.6-1.6V1.6A1.6 1.6 0 0 0 24 0Z" />
      <path
        opacity={0.4}
        d="M27.2 16H4.8C2.08 16 0 18.08 0 20.8c0 2.72 2.08 4.8 4.8 4.8h22.4c2.72 0 4.8-2.08 4.8-4.8 0-2.72-2.08-4.8-4.8-4.8ZM6.4 22.4c-.96 0-1.6-.64-1.6-1.6 0-.96.64-1.6 1.6-1.6.96 0 1.555.64 1.555 1.6 0 .96-.595 1.6-1.555 1.6Zm9.555 0c-.96 0-1.6-.64-1.6-1.6 0-.96.64-1.6 1.6-1.6.96 0 1.6.64 1.6 1.6 0 .96-.595 1.6-1.6 1.6Zm9.645 0c-.96 0-1.6-.64-1.6-1.6 0-.96.64-1.6 1.6-1.6.96 0 1.6.64 1.6 1.6 0 .96-.64 1.6-1.6 1.6Zm-6.4-16V0h-6.4v6.4L16 4.8l3.2 1.6Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h32v25.6H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgComponent;
