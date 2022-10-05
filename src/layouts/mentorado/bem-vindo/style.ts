import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const CourseBox = styled(Box)`
  border: 2px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  height: 24.3rem;
  margin-right: 1.3rem;
  overflow: hidden;
  width: 19rem;

  &:hover {
    border: 2px solid white;
  }
`;

export const BannerBox = styled(Box)`
  background-image: url('/images/banner.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 60vh;
  max-width: 100%;
  padding: 1.6rem 0 1.6rem 2.5rem;

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
