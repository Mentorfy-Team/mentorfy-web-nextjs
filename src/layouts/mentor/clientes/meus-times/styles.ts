import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const TipWrapper = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
`;

export const TipText = styled(Typography)`
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1rem;

  span {
    color: ${({ theme }) => theme.palette.secondary.main};
    margin: 0 0.2rem 0 0.2rem;
  }
`;

export const ButtonsWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 1.8rem;

  justify-content: end;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    gap: 1rem;
    margin-top: 2rem;
  }
`;

export const MentorButtons = styled(Button)<{ fontColor? }>`
  align-items: center;
  display: flex;

  gap: 0.75rem;

  justify-content: center;
  line-height: 1rem;
  text-transform: none;

  @media (max-width: 500px) {
    width: 3.5rem;
  }

  ${({ fontColor }) =>
    fontColor &&
    `
    color: ${fontColor};
    font-weight: 300;
    letter-spacing: 0.05rem;
  `}
`;

export const DeleteMentorButtons = styled(Button)`
  align-items: center;
  display: flex;

  gap: 0.75rem;

  justify-content: center;
  line-height: 1rem;
  text-transform: none;

  @media (max-width: 500px) {
    width: 3.5rem;
  }
  :hover {
    background-color: ${({ theme }) => theme.palette.failure.main};
    color: white;
  }
`;

export const NewTeamButton = styled(Button)`
  align-items: center;
  background: none;
  white-space: nowrap;
  border: 1px solid ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.secondary.main};

  display: flex;
  gap: 0.5rem;
  justify-content: center;
  line-height: 1rem;

  text-transform: none;

  svg {
    path {
      fill: #7586ec;
    }
  }
`;
