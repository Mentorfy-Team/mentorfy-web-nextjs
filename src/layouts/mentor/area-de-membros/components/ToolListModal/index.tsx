import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import ModalComponent from '~/components/modules/Modal';
import { useMentorTools } from '~/hooks/useMentorTools';
import { Description, Title, WrapperTool } from './styles';
import { useGetProduct } from '~/hooks/useGetProduct';
import { userStore } from '~/stores';

type Props = {
  onChange: (tool: MentorTools.ToolType) => void;
  setOpen: (value: boolean) => void;
  open: boolean;
  area_id: string;
};

const ToolList: React.FC<Props> = ({ onChange, setOpen, open, area_id }) => {
  const { product, isLoading } = useGetProduct(area_id);
  const { tools, mutate } = useMentorTools(product.id);
  const { setLoading } = userStore();

  useEffect(() => {
    setLoading(isLoading);
    if (product?.id) mutate();
  }, [isLoading, mutate, product?.id, setLoading]);

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
