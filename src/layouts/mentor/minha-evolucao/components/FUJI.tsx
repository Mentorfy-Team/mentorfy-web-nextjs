const SvgComponent = ({
  width = 1168,
  height = 714,
  fill = 'currentColor',
}) => (
  <svg
    width="475"
    height="49"
    viewBox="0 0 475 49"
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
      d="M3 39.5C3 39.5 61.5 51 136 43.5C209.037 36.1473 328.5 8 472 3"
      stroke="url('#myGradient')"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray="15 15"
    />
  </svg>
);

export default SvgComponent;
