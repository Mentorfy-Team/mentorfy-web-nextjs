import * as React from 'react';

const SvgComponent = (props) => (
  <svg fill="#fff" viewBox="0 0 20 20" className="h-5 w-5" {...props}>
    <path d="M10 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
  </svg>
);

export default SvgComponent;
