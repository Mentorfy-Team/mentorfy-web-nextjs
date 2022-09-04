import * as React from 'react';

const SvgComponent = (props) => (
  <svg
    width={27}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity={0.4}
      d="M13.63 7.206 5.012 8.843a2.043 2.043 0 0 0-1.142.644c-.296.332-.47.752-.492 1.19.196.111.36.269.478.458a1.287 1.287 0 0 1-.385 1.755l1.072 4.686a.639.639 0 0 1-.134.554.673.673 0 0 1-.528.245H1.516a.69.69 0 0 1-.526-.246.65.65 0 0 1-.132-.553l1.071-4.686a1.324 1.324 0 0 1-.438-.495 1.282 1.282 0 0 1 .056-1.264c.118-.19.283-.346.48-.456a3.236 3.236 0 0 1 .803-2.023 3.403 3.403 0 0 1 1.923-1.097l8.618-1.636a.693.693 0 0 1 .513.093.666.666 0 0 1 .29.422.64.64 0 0 1-.105.498.666.666 0 0 1-.44.274Z"
      fill="#fff"
    />
    <path
      d="m26.254 8.154-11.77 3.515a3.468 3.468 0 0 1-1.974 0L4.205 9.188c.24-.172.515-.29.807-.345l8.617-1.636a.686.686 0 0 0 .44-.275.646.646 0 0 0 .004-.737.666.666 0 0 0-.436-.28.693.693 0 0 0-.267.004L4.753 7.555a3.385 3.385 0 0 0-2.007 1.197L.745 8.153c-.993-.296-.993-1.573 0-1.87L12.513 2.77a3.464 3.464 0 0 1 1.974 0l11.767 3.515c.994.297.994 1.573 0 1.87Zm-11.37 4.77a4.852 4.852 0 0 1-2.768 0l-6.117-1.828-.6 4.654c0 1.45 3.629 2.625 8.1 2.625 4.473 0 8.1-1.175 8.1-2.625l-.598-4.654-6.118 1.828Z"
      fill="#fff"
    />
  </svg>
);

export default SvgComponent;