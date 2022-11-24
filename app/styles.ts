'use client';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

export const BannerBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 32rem;
  max-width: 100%;
  position: relative;
  margin-top: 3.1rem;
  justify-content: center;
  overflow: hidden;

  > div {
    margin-left: 2.2rem;
    z-index: 1;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

export const VideoWrapper = styled(Box)`
  height: 100%;
  margin: 0px !important;
  width: 100%;
  position: relative;
  padding-top: 56.25%;
  z-index: 0 !important;
  overflow: hidden;

  .react-player {
    opacity: 0.4;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .react-player-popular {
    opacity: 0.8;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

export const Overlay = styled('div')`
  height: 100%;
  left: -2.4rem;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;

  background: linear-gradient(0deg, rgba(8, 8, 8, 1) 0%, rgba(0, 0, 0, 0) 35%);
`;

export const RatingBox = styled(Box)`
  display: flex;
  gap: 1rem;
  .css-1c99szj-MuiRating-icon {
    color: inherit;
  }
`;

export const DescriptionBox = styled(Box)`
  max-width: 37.5rem;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const Text = styled(Typography)`
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
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

export const VolumeButton = styled(Box)`
  width: 35px;
  height: 35px;
  border: 1px solid #93898a;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: transparent;
    opacity: 0.5;
  }
`;
