import { DefaultProps } from './type';

const SvgComponent = ({
  width = 70,
  height = 40,
  fill = '#1E1E1E',
}: DefaultProps) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={70} height={40} rx={20} fill="#1E1E1E" />
    <mask
      id="a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={5}
      y={5}
      width={30}
      height={30}
    >
      <circle cx={20} cy={20} r={14} fill={fill} strokeWidth={2} />
    </mask>
    <g mask="url(#a)">
      <path d="M5 5h30v30H5V5Z" fill="#ADADAD" />
    </g>
    <path
      opacity={0.4}
      d="M56.63 18.944c0 .123-.05.245-.149.34l-3.033 2.883a.524.524 0 0 1-.715 0l-3.034-2.884a.464.464 0 0 1 0-.68.524.524 0 0 1 .715 0l2.676 2.544 2.677-2.544a.524.524 0 0 1 .715 0 .47.47 0 0 1 .147.34Z"
      fill="#ADADAD"
    />
  </svg>
);

export default SvgComponent;
