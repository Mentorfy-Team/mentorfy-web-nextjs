import * as React from 'react';

const SvgComponent = (props) => (
  <svg
    width={8}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 0c.257 0 .513.098.708.293l6 6a1 1 0 0 1-.001 1.413l-6 6a1 1 0 1 1-1.413-1.414l5.292-5.293L.293 1.706A1 1 0 0 1 1 0Z"
      fill="#fff"
    />
  </svg>
);

export default SvgComponent;
