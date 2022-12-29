import { DefaultProps } from './type';

const SvgComponent = ({ width, height, fill }: DefaultProps) => (
  <svg width={16} height={13} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#a)">
      <path
        d="M.4 11.375h2V2.881c0-.692.538-1.256 1.2-1.256h2.8V3.25H4V13H.4a.403.403 0 0 1-.4-.406v-.813c0-.224.179-.406.4-.406ZM8.194.025l4.8 1.264c.356.093.606.43.606.817v9.27h2c.221 0 .4.181.4.405v.813a.403.403 0 0 1-.4.406H7.2V.843c0-.548.489-.95.994-.817ZM9.4 7.314c.331 0 .6-.364.6-.813 0-.448-.269-.812-.6-.812-.331 0-.6.364-.6.812 0 .449.269.813.6.813Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="matrix(-1 0 0 1 16 0)" d="M0 0h16v13H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgComponent;
