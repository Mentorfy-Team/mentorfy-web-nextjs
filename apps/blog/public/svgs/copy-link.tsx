import { DefaultProps } from './type';

const SvgComponent = ({ width, height, fill }: DefaultProps) => (
  <svg width={27} height={22} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.78 4.125V0h-5.77c-1.365 0-2.472.923-2.472 2.063v12.374c0 1.14 1.107 2.063 2.473 2.063h9.89c1.365 0 2.472-.923 2.472-2.063V5.5h-4.899c-.953 0-1.694-.619-1.694-1.375ZM21.428 0v4.125h4.945L21.428 0ZM9.89 15.125V5.5H2.472C1.107 5.5 0 6.423 0 7.563v12.375C0 21.076 1.107 22 2.472 22h9.89c1.366 0 2.473-.923 2.473-2.063v-2.062h-1.649c-1.818 0-3.296-1.233-3.296-2.75Z"
      fill="#FE7D22"
    />
  </svg>
);

export default SvgComponent;
