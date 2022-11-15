import { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
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
  TipText,
  TipWrapper,
} from './styles';

type props = {
  id: string;
};

const ClientJourney: FC<props> = ({ id }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [background, setBackground] = useState('#7586EC');
  const [completedClients, setcompletedClients] = useState<any>([]);
  const [selectedTask, setSelectedTask] = useState<any>([]);
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

  const handleSelectedStep = (task) => {
    setSelectedTask(task);

    if (task.id === selectedTask.id && background === '#7586EC') {
      setBackground('inherit');
    }
    if (task.id === selectedTask.id && background === 'inherit') {
      setBackground('#7586EC');
    }
    if (task.id !== selectedTask.id && background === 'inherit') {
      setBackground('#7586EC');
    }
    if (background === '#7586EC' && task.id !== selectedTask.id) {
      setBackground('#7586EC');
    }
  };

  const handleClientsTable = (task) => {
    setcompletedClients(() => {
      const maxProgress = task.clients.filter(
        (client) => client.progress === 18.18,
      );
      return [...maxProgress];
    });
  };

  return (
    <ContentWidthLimit withoutScroll maxWidth={1900}>
      <TipWrapper>
        <Image alt="tip-icon" src="/svgs/tip-icon.svg" width={22} height={22} />
        <TipText>
          Clique em uma etapa para
          <span>filtrar a lista de mentorados</span>
          que concluíram a etapa. Clique novamente para cancelar.
        </TipText>
      </TipWrapper>

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
                  {steps[index].extra && step?.extra[0]?.sourceUrl && (
                    <ImageWrapper>
                      <Image
                        alt="imagem-principal"
                        width={40}
                        height={40}
                        src={step?.extra[0]?.sourceUrl}
                      />
                    </ImageWrapper>
                  )}
                  <ImageText
                    sx={{
                      marginTop: `${
                        steps[index].extra && step?.extra[0]?.sourceUrl
                          ? '0'
                          : '2.5rem'
                      }`,
                      fontSize: `${
                        steps[index].extra && step?.extra[0]?.sourceUrl
                          ? '0.8rem'
                          : '0.9rem'
                      }`,
                    }}
                  >
                    {step.title}
                  </ImageText>
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
                  <Class
                    key={task.id}
                    onClick={() => {
                      handleClientsTable(task);
                      handleSelectedStep(task);
                    }}
                    sx={{
                      backgroundColor: `${
                        task.id === selectedTask.id && background
                      }`,
                    }}
                  >
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
          <CompletedClientsTable
            selectedTask={selectedTask}
            clients={completedClients !== null ? completedClients : clients}
          />
        </>
      )}
    </ContentWidthLimit>
  );
};

export default ClientJourney;
