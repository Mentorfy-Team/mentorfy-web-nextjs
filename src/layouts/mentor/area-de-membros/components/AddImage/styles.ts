import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const ButtonLabel = styled('label')`
  cursor: pointer;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  width: 100%;
`;

export const AddImgButton = styled(Button)`
  align-items: center;
  border-radius: 5px;
  display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  height: 2rem;
  line-height: 0.8rem;
  padding: 0px;
  position: unset;

  text-transform: none;
  width: 10.7rem;
  span {
    display: none;
  }
`;
