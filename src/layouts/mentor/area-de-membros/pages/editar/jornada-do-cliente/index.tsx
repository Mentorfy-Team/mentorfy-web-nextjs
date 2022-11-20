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
import SwicthClientJouneyModal from './helpers/SwicthModal';
import { useRouter } from 'next/router';

type props = {
  id: string;
};

const ClientJourney: FC<props> = ({ id }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [background, setBackground] = useState('#7586EC');
  const [completedClients, setcompletedClients] = useState<any[]>();
  const [selectedTask, setSelectedTask] = useState<any>();
  const [clientInput, setClientInput] = useState<any>();
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState<ProductTypes.resultJorney[]>();
  const {
    data: { clients, result: stepsData },
    isLoading,
  } = useListOfClientsInProduct(id);
  const { setLoading } = userStore();
  const route = useRouter();
  useEffect(() => {
    setSteps(stepsData);
  }, [stepsData]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const handleSelectedStep = (task) => {
    setSelectedTask(task);

    if (task.id === task.id && background === '#7586EC') {
      setBackground('inherit');
    }
    if (task.id === task.id && background === 'inherit') {
      setBackground('#7586EC');
    }
    if (task.id !== task.id && background === 'inherit') {
      setBackground('#7586EC');
    }
    if (background === '#7586EC' && task.id !== task.id) {
      setBackground('#7586EC');
    }
  };

  const handleSelectedClient = (client: ProductTypes.Client) => {
    if (!selectedTask) {
      route.push(route.asPath + '/perfil?altId=' + client.id);
    } else {
      setClientInput(() => {
        const Inputs = client.inputs?.filter(
          (input) => input.member_area_tool_id === selectedTask?.id,
        );
        if (Inputs?.length > 0) {
          if (selectedTask.mentor_tool === 4) {
            const InputsData = {
              input: (Inputs[0].extra as any).comments,
              date: Inputs[0].created_at,
              client,
            };
            return InputsData;
          } else {
            const InputsData = {
              input: Inputs[0].data,
              date: Inputs[0].created_at,
              client,
            };
            return InputsData;
          }
        }
      });
    }

    setOpen(true);
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
                  <ImageWrapper>
                    {steps[index].extra && step?.extra[0]?.sourceUrl && (
                      <Image
                        alt="imagem-principal"
                        width={40}
                        height={40}
                        src={step?.extra[0]?.sourceUrl}
                      />
                    )}
                  </ImageWrapper>
                  <ImageText>{step.title}</ImageText>
                </Box>
                <Box sx={{ textAlign: 'right', position: 'relative' }}>
                  <Typography
                    sx={{
                      fontWeight: '600',
                      position: 'absolute',
                      right: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Total de Mentorandos
                  </Typography>
                  <BundleAmount
                    sx={{
                      position: 'absolute',
                      right: 0,
                      top: '21px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {step.currentClients.length}
                  </BundleAmount>
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
                      handleSelectedStep(task);
                    }}
                    sx={{
                      backgroundColor: `${
                        task.id === selectedTask?.id && background
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
            clients={clients}
            onSelectedClient={handleSelectedClient}
          />
        </>
      )}

      {open && clientInput && selectedTask && (
        <SwicthClientJouneyModal
          open={open}
          setOpen={setOpen}
          type={selectedTask?.mentor_tool}
          selectedClient={clientInput.client}
          selectedTask={selectedTask}
          finishedDate={clientInput.date}
          clientInputs={clientInput.input}
        />
      )}
    </ContentWidthLimit>
  );
};

export default ClientJourney;
