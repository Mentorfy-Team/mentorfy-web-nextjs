const SvgComponent = ({
  width = 1168,
  height = 714,
  fill = 'currentColor',
}) => (
  <svg
    width="626"
    height="56"
    viewBox="0 0 626 56"
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
      d="M3 52.5C3 52.5 93.7471 53.3023 168.5 49C238 45 521.5 28.5 622.5 3.5"
      stroke="url('#myGradient')"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray="15 15"
    />
  </svg>
);

export default SvgComponent;
