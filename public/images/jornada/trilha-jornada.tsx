import { DefaultProps } from './../../svgs/type';

const SvgComponent = ({
  width = 1168,
  height = 714,
  fill = 'currentColor',
}: DefaultProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 1168 714"
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
    <g id="TRILHA">
      <rect
        id="Rectangle 190"
        width="1168"
        height="714"
        fill="black"
        fill-opacity="0.01"
      />
      <path
        id="Caminho-Jornada"
        d="M122.31 609C122.31 609 276.168 620.8 373.81 615C479.646 608.713 483.765 567.054 589.31 799.31 370C682.027 384.991 542.81 364 542.81 364C542.81 364 412.399 343.853 328.31 335.5C252.349 327.955 206.407 343.995 133.31 322C97.7829 311.31 70.2457 312.916 45.8097 285C15.6348 250.528 12.6475 212.053 28.3097 169C39.9525 136.996 54.937 118.406 85.3097 103C135.931 77.3242 171.521 123.543 227.31 134C330.672 153.374 389.181 171.628 494.31 169C582.628 166.792 629.612 139.11 717.81 134C821.291 128.004 879.647 159.085 982.81 149"
        stroke="url('#myGradient')"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-dasharray="15 15"
      />
      <path
        id="Caminho-Jornada"
        d="M992.31 147C992.31 147 1055.91 148.837 1091.81 133C1118.33 121.301 1152.31 90 1152.31 90"
        stroke="white"
        stroke-width="6"
        stroke-linejoin="round"
        stroke-dasharray="15 15"
      />
    </g>
  </svg>
);

export default SvgComponent;
