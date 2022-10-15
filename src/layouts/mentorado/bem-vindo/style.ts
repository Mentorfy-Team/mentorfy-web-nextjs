import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const Background = styled(Box)`
  background: #080808;
  > div > img,
  video,
  iframe {
    -webkit-mask-image: -webkit-gradient(
      linear,
      from(rgba(0, 0, 0, 1)),
      to(rgba(0, 0, 0, 0))
    );
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
  * {
    opacity: 1;
    transition: opacity 3s ease-in-out;
  }
  // fade out if class hide is present
  .hide {
    opacity: 0;
  }

  .video {
    position: absolute;
  }

  .container {
    display: flex;
  }

  .item {
    position: relative;
    display: block;
    transition: transform 500ms;
  }

  .container:focus-within .item,
  .container:hover .item {
    transform: translateX(-5%);
  }

  .item:focus ~ .item,
  .item:hover ~ .item {
    transform: translateX(5%);
  }

  .container .item:focus,
  .container .item:hover {
    transform: scale(1.1);
    z-index: 1;
  }

  .item img {
    display: block;
    max-width: 100%;
  }
`;

export const VideoHolder = styled(Box)`
  height: 100%;
  margin: 0px !important;
  position: absolute;
  width: 100%;
`;

export const Videoshow = styled(Box)`
  display: flex;
  flex-direction: row;
  margin: 0 0 1.2rem 0;
  overflow: visible;
`;

export const CourseBox = styled(Box)`
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  height: 12rem;
  margin-right: 1.3rem;
  overflow: hidden;
  width: 19rem;
`;

export const BannerBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 60vh;
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

export const CollorFullTypography = styled(Typography)`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background: linear-gradient(
    40.22deg,
    #1774ff 22.52%,
    #9f12e1 50.99%,
    #ff0b0b 76.9%
  );
  background-clip: text;

  font-size: 2.5rem;
  font-style: normal;
  font-weight: 900;
  line-height: 3rem;

  text-align: start;
  text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
`;
