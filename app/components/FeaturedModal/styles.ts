'use client';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const OverlayPopular = styled('div')`
  height: 100%;

  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;

  background: linear-gradient(0deg, rgba(8, 8, 8, 1) 5%, rgba(0, 0, 0, 0) 50%);
`;

export const Colorful = styled(Typography)<{ one; two; three }>`
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background: ${({ one, two, three }) =>
    `linear-gradient(90deg, ${one} 0%, ${two} 50%, ${three} 100%)`};
  background-clip: text;

  font-size: 2rem;
  font-style: normal;
  font-weight: 900;
  line-height: 3rem;

  text-align: start;
  text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
`;

export const PopularProductDescription = styled(Typography)`
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 1.4rem;
  text-align: start;
  opacity: 0.8;
`;

export const PopularButton = styled(Button)`
  background-color: white;
  color: black;
  position: relative;
  width: 15%;
  margin-left: auto;

  :hover {
    background-color: gray;
    color: black;
  }
`;
