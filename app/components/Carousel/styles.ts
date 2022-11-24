import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const CourseBox = styled(Box)`
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
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
