const SvgComponent = ({
  width = 1168,
  height = 714,
  fill = 'currentColor',
}) => (
  <svg
    width="532"
    height="238"
    viewBox="0 0 532 238"
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
      d="M528.594 234.5C528.594 234.5 398.184 214.353 314.094 206C238.133 198.455 198.674 203.781 123.784 189"
      stroke="url('#myGradient')"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray="15 15"
    />
    <path
      d="M123.784 189C85.7843 181.5 62.7843 182 38.7843 160C5.01276 129.043 -0.500098 130.5 5.49998 98C11.6829 64.5096 26.1273 55.9055 56.5 40.5C78 29.5949 140 3 200.5 3"
      stroke="white"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-dasharray="15 15"
    />
  </svg>
);

export default SvgComponent;
