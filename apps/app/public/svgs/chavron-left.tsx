import { DefaultProps } from './type';

const SvgComponent = ({ width = 8, height = 14, fill }: DefaultProps) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 13.999a.996.996 0 0 1-.708-.293l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 1 1 1.414 1.415L2.414 6.999l5.293 5.294a1 1 0 0 1-.708 1.706Z"
      fill={fill ? fill : '#fff'}
    />
  </svg>
);

export default SvgComponent;
