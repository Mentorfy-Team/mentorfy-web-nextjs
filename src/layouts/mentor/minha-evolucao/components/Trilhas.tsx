const SvgComponent = ({
  width = 1168,
  height = 714,
  fill = 'currentColor',
  progress = {
    0: 0,
    1: 0,
    1.1: 0,
    2: 0,
    2.2: 0,
    3: 0,
  },
}) => (
  <svg
    width="1118"
    height="500"
    viewBox="0 0 1118 594"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="FUJI">
      <defs>
        <linearGradient id="progress5" gradientTransform="rotate(0)">
          <stop offset="0%" stop-color="rgb(0,255,0)" stop-opacity="1" />
          <stop
            offset={progress[0] + '%'}
            stop-color="rgb(0,255,0)"
            stop-opacity="1"
          />

          <stop
            offset={progress[0] + '%'}
            stop-color="rgba(255,255,255,0.3)"
            stop-opacity="1"
          />
          <stop
            offset="100%"
            stop-color="rgba(255,255,255,0.3)"
            stop-opacity="1"
          />
        </linearGradient>
      </defs>
      <path
        id="100"
        d="M178 584.5C178 584.5 236.5 596 311 588.5C384.037 581.147 529.5 550.5 673 545.5"
        stroke="url('#progress5')"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="15 15"
      />
    </g>
    <g id="KILI">
      <defs>
        <linearGradient id="progress6" gradientTransform="rotate(90)">
          <stop
            offset="0%"
            stop-color="rgba(255,255,255,0.3)"
            stop-opacity="1"
          />
          <stop
            offset={100 - (progress[1.1] - 15) + '%'}
            stop-color="rgba(255,255,255,0.3)"
            stop-opacity="1"
          />

          <stop
            offset={100 - (progress[1.1] - 15) + '%'}
            stop-color="rgb(0,255,0)"
            stop-opacity="1"
          />
          <stop
            offset="100%"
            stop-color={progress[1.1] > 0 && 'rgb(0,255,0)'}
            stop-opacity="1"
          />
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="progress7" gradientTransform="rotate(-10)">
          <stop offset="0%" stop-color="rgb(0,255,0)" stop-opacity="1" />
          <stop
            offset={progress[1] + '%'}
            stop-color="rgb(0,255,0)"
            stop-opacity="1"
          />
          <stop
            offset={progress[1] + '%'}
            stop-color="rgba(255,255,255,0.3)"
            stop-opacity="1"
          />
          <stop
            offset="100%"
            stop-color="rgba(255,255,255,0.3)"
            stop-opacity="1"
          />
        </linearGradient>
      </defs>
      <path
        id="70"
        d="M1071.28 445C1071.28 414 1061.72 389.174 1020.78 372C970.784 351.021 829.594 345.5 784.094 345.5C665.857 345.5 527.594 339.5 527.594 339.5"
        stroke="url('#progress6')"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="15 15"
      />
      <path
        id="30"
        d="M829.594 547.5C829.594 547.5 998.808 538.446 1033.78 509.5C1048.28 497.5 1071.28 476 1071.28 445"
        stroke="url('#progress7')"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="15 15"
      />
    </g>
    <g id="OLIMPO">
      <defs>
        <linearGradient id="progress8" gradientTransform="rotate(0)">
          <stop
            offset="0%"
            stop-color="rgba(255,255,255,0.3)"
            stop-opacity="1"
          />
          <stop
            offset={100 - (progress[2] + 5) + '%'}
            stop-color="rgba(255,255,255,0.3)"
            stop-opacity="1"
          />

          <stop
            offset={100 - (progress[2] + 5) + '%'}
            stop-color="rgb(0,255,0)"
            stop-opacity="1"
          />
          <stop offset="100%" stop-color="rgb(0,255,0)" stop-opacity="1" />
        </linearGradient>
      </defs>
      <defs>
        <linearGradient
          id="progress9"
          gradientTransform={`rotate(${
            progress[2.2] < 90 ? progress[2.2] : 90
          })`}
        >
          <stop
            offset="0%"
            stop-color="rgba(255,255,255,0.3)"
            stop-opacity="1"
          />
          <stop
            offset={100 - progress[2.2] + '%'}
            stop-color="rgba(255,255,255,0.3)"
            stop-opacity="1"
          />

          <stop
            offset={100 - progress[2.2] + '%'}
            stop-color="rgb(0,255,0)"
            stop-opacity="1"
          />
          <stop
            offset="100%"
            stop-color={progress[2.2] > 0 && 'rgb(0,255,0)'}
            stop-opacity="1"
          />
        </linearGradient>
      </defs>
      <path
        id="50"
        d="M527.594 339.5C527.594 339.5 397.184 319.353 313.094 311C237.133 303.455 197.674 308.781 122.784 294"
        stroke="url('#progress8')"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="15 15"
      />
      <path
        id="100_2"
        d="M122.784 294C91.5 294 49.2727 283.5 33.9999 269.5C9.99996 247.5 -1.50012 235.5 4.49996 203C10.6829 169.51 27 157 44.5 142.5C58.3145 131.054 86.5 123.5 122.784 123.5"
        stroke="url('#progress9')"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="15 15"
      />
    </g>
    <g id="EVEREST">
      <defs>
        <linearGradient id="progress10" gradientTransform="rotate(0)">
          <stop offset="0%" stop-color="rgb(0,255,0)" stop-opacity="1" />
          <stop
            offset={progress[3] + '%'}
            stop-color="rgb(0,255,0)"
            stop-opacity="1"
          />

          <stop
            offset={progress[3] + '%'}
            stop-color="rgba(255,255,255,0.3)"
            stop-opacity="1"
          />
          <stop
            offset="100%"
            stop-color="rgba(255,255,255,0.3)"
            stop-opacity="1"
          />
        </linearGradient>
      </defs>
      <path
        id="100_3"
        d="M240 128C240 128 358.747 132.302 433.5 128C503 124 855.5 100 956.5 75"
        stroke="url('#progress10')"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="15 15"
      />
    </g>
    <path
      id="extra"
      d="M969 73C969 73 1018.6 61.8374 1054.5 46C1081.02 34.3009 1115 3 1115 3"
      stroke="#787878"
      stroke-width="6"
      stroke-linejoin="round"
      stroke-dasharray="15 15"
    />
  </svg>
);

export default SvgComponent;
