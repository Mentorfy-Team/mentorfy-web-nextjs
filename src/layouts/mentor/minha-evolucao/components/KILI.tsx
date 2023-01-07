const SvgComponent = ({
  width = 1168,
  height = 714,
  fill = 'currentColor',
}) => (
  <svg
    width="551"
    height="215"
    viewBox="0 0 551 215"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="myGradient" gradientTransform="rotate(90)">
        <stop offset="0%" stop-color="rgb(255,0,0)" stop-opacity="1" />
        <stop offset="10%" stop-color="rgb(255,0,0)" stop-opacity="1" />
        <stop offset="10%" stop-color="rgb(0,255,0)" stop-opacity="1" />
        <stop offset="67%" stop-color="rgb(0,255,0)" stop-opacity="1" />
        <stop offset="67%" stop-color="rgb(0,0,255)" stop-opacity="1" />
        <stop offset="100%" stop-color="rgb(0,0,255)" stop-opacity="1" />
      </linearGradient>
    </defs>
    <path
      d="M547.284 109C547.284 78.0001 537.715 53.1739 496.784 36.0001C446.784 15.021 305.594 9.49994 260.094 9.49994C141.857 9.49994 3.59424 3.5 3.59424 3.5"
      stroke="url('#myGradient')"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray="15 15"
    />
    <path
      d="M305.594 211.5C305.594 211.5 474.808 202.446 509.784 173.5C524.284 161.5 547.284 140 547.284 109"
      stroke="url('#myGradient')"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray="15 15"
    />
  </svg>
);

export default SvgComponent;
