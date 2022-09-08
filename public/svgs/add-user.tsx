import { DefaultProps } from './type';

const SvgComponent = ({ width, height, fill = '#FE7D22' }: DefaultProps) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#a)" fill={fill}>
      <path d="M27.912 8.984h-2.175V6.828c0-.593-.484-1.078-1.087-1.078s-1.088.483-1.088 1.078v2.156h-2.175c-.598 0-1.087.486-1.087 1.079 0 .592.487 1.078 1.087 1.078h2.175v2.156c0 .597.49 1.078 1.088 1.078.598 0 1.087-.483 1.087-1.078V11.14h2.175A1.08 1.08 0 0 0 29 10.062a1.08 1.08 0 0 0-1.088-1.078Z" />
      <path d="M10.15 11.5c3.204 0 5.8-2.574 5.8-5.75S13.354 0 10.15 0c-3.204 0-5.8 2.574-5.8 5.75s2.596 5.75 5.8 5.75Zm2.297 2.156H7.853C3.517 13.656 0 17.142 0 21.441 0 22.304.703 23 1.57 23h17.16c.868 0 1.57-.696 1.57-1.559 0-4.299-3.516-7.785-7.853-7.785Z" />
    </g>
    <defs>
      <clipPath id="a">
        <rect width={width} height={height} rx={5} fill={fill} />
      </clipPath>
    </defs>
  </svg>
);

export default SvgComponent;
