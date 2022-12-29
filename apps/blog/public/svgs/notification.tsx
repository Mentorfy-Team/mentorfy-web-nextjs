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
      d="M12.252 5.8a4.968 4.968 0 0 0-1.318-3.394C10.09 1.506 8.944 1 7.75 1c-1.194 0-2.338.506-3.182 1.406A4.968 4.968 0 0 0 3.25 5.801c0 5.6-2.25 7.201-2.25 7.201h13.502s-2.25-1.6-2.25-7.201ZM9.05 15.252a1.5 1.5 0 0 1-2.596 0"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
