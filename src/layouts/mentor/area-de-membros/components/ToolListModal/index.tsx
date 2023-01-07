import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import { useMentorTools } from '~/hooks/useMentorTools';
import { Description, Title, WrapperTool } from './styles';
import { useGetProduct } from '~/hooks/useGetProduct';
import { userStore } from '~/stores';
import Image from 'next/image';

const ModalComponent = dynamic(() => import('~/components/modules/Modal'), {
  ssr: false,
});
type Props = {
  onChange: (tool: MentorTools.ToolType) => void;
  setOpen: (value: boolean) => void;
  open: boolean;
  area_id: string;
};

const ToolList: React.FC<Props> = ({ onChange, setOpen, open, area_id }) => {
  const { product, isLoading } = useGetProduct(area_id);
  const {
    tools,
    mutate,
    isLoading: isToolsLoading,
  } = useMentorTools(product?.id);
  const { setLoading, isLoading: GlobalLoading } = userStore();

  console.log(tools);
  useEffect(() => {
    setLoading(isToolsLoading);
    if (product?.id) mutate();
  }, [isLoading, isToolsLoading, mutate, product?.id, setLoading, tools]);

  return (
    <ModalComponent
      open={open && (!GlobalLoading || tools?.length > 0)}
      setOpen={setOpen}
      withoutSave
      title="Lista de Ferramentas"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {tools
          ?.sort((a, b) => a.order - b.order)
          ?.map((item) => (
            <WrapperTool
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              key={item.id}
            >
              <Image
                width="535"
                height="150"
                alt={item.name}
                src={item.image}
                style={{
                  objectFit: 'cover',
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
                  maxWidth: '535px',
                }}
              >
                <Title>{item.name}</Title>
                <Description>{item.description}</Description>
              </Box>
            </WrapperTool>
          ))}
      </Box>
    </ModalComponent>
  );
};

export default ToolList;
