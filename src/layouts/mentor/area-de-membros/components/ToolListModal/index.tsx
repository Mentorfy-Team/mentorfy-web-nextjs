import React from 'react';
import Box from '@mui/material/Box';
import ModalComponent from '~/components/modules/Modal';
import { useMentorTools } from '~/hooks/useMentorTools';
import { Description, Title, WrapperTool } from './styles';

type Props = {
  onChange: (tool: MentorTools.ToolType) => void;
  setOpen: (value: boolean) => void;
  open: boolean;
};

const ToolList: React.FC<Props> = ({ onChange, setOpen, open }) => {
  const { tools } = useMentorTools();

  return (
    <ModalComponent
      open={open}
      setOpen={setOpen}
      withoutSave
      title="Lista de Ferramentas"
    >
      {tools.map((item) => (
        <WrapperTool
          onClick={() => {
            onChange(item);
            setOpen(false);
          }}
          key={item.id}
        >
          <Box
            sx={{
              flex: 1,
              backgroundColor: 'primary.light',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0.4rem 1rem',
              backgroundColor: 'primary.dark',
            }}
          >
            <Title>{item.name}</Title>
            <Description>{item.description}</Description>
          </Box>
        </WrapperTool>
      ))}
    </ModalComponent>
  );
};

export default ToolList;
