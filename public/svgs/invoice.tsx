import { DefaultProps } from './type';

const SvgComponent = ({
  width = 25,
  height = 25,
  fill = '#d4d4d4',
}: DefaultProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 28 37"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.4896 7.58789L20.351 0.505859C20.0229 0.180664 19.5781 0 19.1115 0H18.6667V9.25H28V8.80918C28 8.35391 27.8177 7.91309 27.4896 7.58789ZM16.3333 9.82812V0H1.75C0.780208 0 0 0.773242 0 1.73438V35.2656C0 36.2268 0.780208 37 1.75 37H26.25C27.2198 37 28 36.2268 28 35.2656V11.5625H18.0833C17.1208 11.5625 16.3333 10.782 16.3333 9.82812ZM4.66667 5.20312C4.66667 4.88371 4.92771 4.625 5.25 4.625H11.0833C11.4056 4.625 11.6667 4.88371 11.6667 5.20312V6.35938C11.6667 6.67879 11.4056 6.9375 11.0833 6.9375H5.25C4.92771 6.9375 4.66667 6.67879 4.66667 6.35938V5.20312ZM4.66667 10.9844V9.82812C4.66667 9.50871 4.92771 9.25 5.25 9.25H11.0833C11.4056 9.25 11.6667 9.50871 11.6667 9.82812V10.9844C11.6667 11.3038 11.4056 11.5625 11.0833 11.5625H5.25C4.92771 11.5625 4.66667 11.3038 4.66667 10.9844ZM15.1667 30.0538V31.7969C15.1667 32.1163 14.9056 32.375 14.5833 32.375H13.4167C13.0944 32.375 12.8333 32.1163 12.8333 31.7969V30.0415C12.0101 29.9996 11.2095 29.7149 10.5459 29.2213C10.2616 29.0096 10.247 28.5876 10.5044 28.344L11.3611 27.5339C11.5631 27.3431 11.8635 27.3345 12.0998 27.4812C12.382 27.6561 12.7021 27.75 13.0346 27.75H15.0843C15.5582 27.75 15.9447 27.3222 15.9447 26.7968C15.9447 26.3668 15.6815 25.9882 15.3052 25.8769L12.024 24.9013C10.6684 24.498 9.72125 23.2088 9.72125 21.7657C9.72125 19.9937 11.1103 18.5542 12.8326 18.5087V16.7656C12.8326 16.4462 13.0936 16.1875 13.4159 16.1875H14.5826C14.9049 16.1875 15.1659 16.4462 15.1659 16.7656V18.521C15.9892 18.5629 16.7898 18.8469 17.4533 19.3412C17.7377 19.5529 17.7523 19.9749 17.4949 20.2185L16.6381 21.0286C16.4361 21.2194 16.1357 21.228 15.8995 21.0813C15.6173 20.9057 15.2972 20.8125 14.9647 20.8125H12.915C12.441 20.8125 12.0546 21.2403 12.0546 21.7657C12.0546 22.1957 12.3178 22.5743 12.6941 22.6856L15.9753 23.6612C17.3308 24.0645 18.278 25.3537 18.278 26.7968C18.278 28.5695 16.889 30.0083 15.1667 30.0538Z"
      fill={fill}
    />
  </svg>
);

export default SvgComponent;