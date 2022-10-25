import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const WrapperBox = styled(Box)`
  min-height: 80px;
`;
export const WrapperTool = styled(Box)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  min-height: 200px;
`;

export const Title = styled(Typography)`
  color: green;
  font-size: 0.8rem;
`;

export const Description = styled(Typography)`
  color: gray;
  font-size: 0.8rem;
`;
