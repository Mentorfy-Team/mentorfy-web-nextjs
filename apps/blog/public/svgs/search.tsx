import { DefaultProps } from './type';

const SvgComponent = ({
  width = 17,
  height = 17,
  fill = '#7D7D7D',
}: DefaultProps) => (
  <svg
    width={width}
    height={height}
    fill="transparent"
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.25 12.25 16 16M1 7.429a6.429 6.429 0 1 0 12.857 0A6.429 6.429 0 0 0 1 7.429Z"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
