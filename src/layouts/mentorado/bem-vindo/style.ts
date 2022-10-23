/* eslint-disable better-styled-components/sort-declarations-alphabetically */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Overlay = styled('div')`
  height: 100%;
  left: -2.4rem;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;

  background: linear-gradient(0deg, rgba(8, 8, 8, 1) 0%, rgba(0, 0, 0, 0) 35%);
`;

export const Background = styled(Box)`
  background: #080808;
  > div > video,
  iframe {
    z-index: -1;
    -webkit-mask-image: -webkit-gradient(
      linear,
      from(rgba(0, 0, 0, 1)),
      to(rgba(0, 0, 0, 0))
    );
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
  * {
    opacity: 1;
    scroll-behavior: smooth;
    transition: opacity 3s ease-in-out;
  }
  // fade out if class hide is present
  .hide {
    opacity: 0;
  }

  .main_image {
    z-index: 1;
  }

  .video {
    position: absolute;
  }

  .slick-list {
    overflow: visible;
  }

  .slick-slide {
    display: block;
    position: relative;
    transition: transform 500ms;
  }

  .slick-track:focus-within .slick-slide,
  .slick-track:hover .slick-slide {
    transform: translateX(-5%);
  }

  .slick-slide:focus ~ .slick-slide,
  .slick-slide:hover ~ .slick-slide {
    transform: translateX(5%);
  }

  .slick-track .slick-slide:focus,
  .slick-track .slick-slide:hover {
    transform: scale(1.05);
    z-index: 1;
  }

  .slick-slide img {
    display: block;
    max-width: 100%;
  }

  .arrow__btn {
    background: rgb(0, 0, 0);
    color: red;
    font-size: 6em;
    padding: 20px;
    position: absolute;
    text-align: center;
    text-decoration: none;
    width: 80px;
    z-index: 1;
    cursor: pointer;
  }

  .slick-arrow {
    z-index: 2;
    scale: 4;
    margin: 10px;
  }

  .slick-prev {
    ::before {
      content: '‹';
      scale: 2;
    }
  }

  .slick-next {
    ::before {
      content: '›';
    }
  }

  .left-arrow {
    background: linear-gradient(
      -90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    );
    bottom: 0;
    left: 0;
    top: 0;

    ::before {
      content: '‹';
    }
  }

  .right-arrow {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    );
    bottom: 0;
    right: 0;
    top: 0;

    ::before {
      content: '›';
    }
  }
`;

export const AbsoluteTopBox = styled(Box)`
  left: 0;
  margin-left: 6%;
  position: absolute;
  top: 0;
`;
export const AbsoluteBottomBox = styled(Box)`
  bottom: -15px;
  left: 0;
  margin: 6%;
  position: absolute;
`;

export const PlayButton = styled(Button)`
  background-color: white;
  color: black;
  padding: 1.1rem 1rem 1.1rem 0.5rem;
  svg {
    path {
      fill: black;
    }
  }

  :hover {
    background-color: gray;
    color: black;
    padding: 1.1rem 1rem 1.1rem 0.5rem;
  }
`;

export const MoreInfo = styled(Button)`
  background-color: rgba(100, 100, 100, 0.5);
  color: white;
  padding: 1.1rem 1rem 1.1rem 0.5rem;

  svg {
    path {
      fill: white;
    }
  }

  :hover {
    background-color: rgba(100, 100, 100, 0.2);
    color: white;
    padding: 1.1rem 1rem 1.1rem 0.5rem;
  }
`;

export const VideoHolder = styled(Box)`
  height: 100%;
  margin: 0px !important;
  width: 100%;
  position: relative;
  padding-top: 56.25%;
  z-index: 0 !important;

  .react-player {
    opacity: 0.4;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

export const Videoshow = styled(Box)`
  --_spacer: var(--size-3);

  display: grid;
  gap: var(--_spacer);
  grid-auto-columns: 21%;
  grid-auto-flow: column;
  margin: 0 0 1.2rem 0;

  overflow-y: visible;
  overscroll-behavior-inline: contain;
  padding: 0 var(--_spacer) var(--_spacer);
`;

export const CourseBox = styled(Box)`
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
`;

export const BannerBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 32rem;
  max-width: 100%;
  position: relative;

  > div {
    margin-left: 2.2rem;
    z-index: 1;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

export const RatingBox = styled(Box)`
  display: flex;
  gap: 1rem;
  .css-1c99szj-MuiRating-icon {
    color: inherit;
  }
`;

export const CustomTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.caption.main};
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
`;

export const ProductTitle = styled(Typography)`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 900;
  line-height: 2rem;
  margin-bottom: 0.5rem;

  max-width: 23ch;
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const CollorFullTypography = styled(Typography)`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background: linear-gradient(40.22deg, #c02425 22.52%, #f0cb35 76.9%);
  background-clip: text;

  font-size: 2.5rem;
  font-style: normal;
  font-weight: 900;
  line-height: 3rem;

  text-align: start;
  text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
`;

export const CollorFullMentorfy = styled(Typography)`
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 3rem;
  text-align: start;
  text-shadow: 0px 0.15rem 0.25rem rgba(0, 0, 0, 1);
  span {
    color: #fe7d22;
  }
`;
