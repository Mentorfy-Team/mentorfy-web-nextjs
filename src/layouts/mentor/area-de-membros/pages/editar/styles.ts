import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { css, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const SaveButton = styled(LoadingButton)`
  svg {
    scale: 0.7;
  }
`;

export const GroupHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.4rem;
`;

export const GroupWrapper = styled(Box)`
  border: 3px solid ${({ theme }) => theme.palette.primary.light};
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const AddGroup = styled(Button)`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  padding-left: 0.4rem;
  svg {
    margin-right: 0.2rem;
    scale: 0.7;
  }
`;

export const AddTool = styled(Button)`
  align-self: end;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.main};
  height: 2rem;
  svg {
    margin-right: 0.2rem;
    scale: 0.7;
  }
  margin-bottom: 0.4rem;
  margin-right: 0.4rem;
  margin-top: 0.4rem;
  padding: 1rem 0.7rem;
  padding-left: 0.4rem;
`;

export const AddCategory = styled(Box)`
  display: flex;
  align-self: center;
  background-color: transparent;
  color: ${({ theme }) => theme.palette.secondary.main};
  height: 2rem;
  svg {
    margin-right: 0.2rem;
    scale: 0.7;
  }
  margin-bottom: 0.4rem;
  margin-right: 0.4rem;
  margin-top: 0.4rem;
  padding-left: 0.4rem;
`;

export const ReturnButton = styled(Button)`
  height: 2.5rem;
  margin-left: 1px;
  padding: 0px;
  span {
    margin-left: 16.5px;
  }
  path {
    fill: ${({ theme }) => theme.palette.accent.main};
  }
`;

export const SvgWrapper = styled('div')`
  svg {
    margin-right: 8px;
    margin-top: 6px;
    scale: 0.7;
  }
`;

export const ButtonsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ScrollWrapper = styled(Box)<{ withtoolbar?: string }>`
  ${({ withtoolbar }) => css`
    max-height: calc(
      100vh - (11rem + ${withtoolbar === 'true' ? '4rem' : '0rem'})
    );
    overflow-y: auto;
  `}
`;

export const CustomTypograpy = styled(Typography)`
  color: ${({ theme }) => theme.palette.tertiary.main};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.2rem;
  margin: 1.2rem auto;
  text-align: start;
`;
