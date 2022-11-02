import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/future/image';
import SearchInput from '~/components/atoms/SearchInput';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { useListOfClientsInProduct } from '~/hooks/useListOfClientsInProduct';
import { userStore } from '~/stores';
import CompletedClientsTable from './components/Tabela-Clientes-Concluído';
import {
  Bundle,
  BundleAmount,
  BundleHeader,
  Class,
  ClassDescription,
  ClassWrapper,
  ImageText,
  ImageWrapper,
  ScrollArea,
} from './styles';

type props = {
  id: string;
};

const ClientJourney: FC<props> = ({ id }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [steps, setSteps] = useState<ProductTypes.resultJorney[]>([]);
  const {
    data: { clients, result: stepsData },
    isLoading,
  } = useListOfClientsInProduct(id);
  const { setLoading } = userStore();

  useEffect(() => {
    setSteps(stepsData);
  }, [stepsData]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <ContentWidthLimit withoutScroll maxWidth={1900}>
      <ScrollArea>
        {steps?.map((step, index) => (
          <Bundle key={index}>
            <BundleHeader>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexDirection: 'column',
                  }}
                >
                  <ImageWrapper>
                    <Image
                      alt="imagem-principal"
                      width={40}
                      height={40}
                      src={steps[index].extra ? step?.extra[0]?.sourceUrl : ''}
                    />
                  </ImageWrapper>
                  <ImageText>{step.title}</ImageText>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontWeight: '600' }}>
                    Total de Mentorandos
                  </Typography>
                  <BundleAmount>{step.currentClients.length}</BundleAmount>
                </Box>
              </Box>
            </BundleHeader>

            <ClassWrapper>
              {step.rows.map((task, taskIndex) => {
                const percent = task.progress || 0;
                return (
                  <Class key={task.id}>
                    <ClassDescription>{task.title}</ClassDescription>

                    <ClassDescription>
                      {percent}%{' '}
                      <Image
                        alt="imagem-principal"
                        width={13}
                        height={13}
                        src={`/svgs/${
                          percent === 100 ? 'done' : 'done-gray'
                        }.svg`}
                      />
                    </ClassDescription>
                  </Class>
                );
              })}
            </ClassWrapper>
          </Bundle>
        ))}
      </ScrollArea>

      {!isLoading && (
        <>
          <SearchInput
            sx={{
              width: isMobile ? '90vw' : '15vw',
              margin: '1rem 0',
            }}
          />
          <CompletedClientsTable clients={clients} />
        </>
      )}
    </ContentWidthLimit>
  );
};

export default ClientJourney;
