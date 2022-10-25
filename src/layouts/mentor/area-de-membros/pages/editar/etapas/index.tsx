import { FC, useCallback, useEffect, useState } from 'react';
import { Task, Workspaces } from '@mui/icons-material';
import Save from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { DnDObject } from '~/components/modules/DragNDrop';
import EditMembersAreaSteps from '~/components/modules/EditMembersAreaSteps';
import { OrganizeTools } from '~/helpers/OrganizeTools';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
import {
  ToolListNames,
  ToolsModalProps,
} from '~/layouts/mentor/area-de-membros/helpers/SwitchModal';
import { FilesToDelete } from '~/services/file-upload.service';
import { UpdateMemberAreaTools } from '~/services/member-area.service';
import {
  AddGroup,
  AddTool,
  ButtonsWrapper,
  CustomTypograpy,
  GroupHeader,
  GroupWrapper,
  ReturnButton,
  SaveButton,
  ScrollWrapper,
} from '../styles';
import ChavronLeftSvg from '~/../public/svgs/chavron-left';

const DragNDrop = dynamic(() => import('~/components/modules/DragNDrop'), {
  ssr: false,
});

const SwitchModal = dynamic<ToolsModalProps>(
  () => import('~/layouts/mentor/area-de-membros/helpers/SwitchModal'),
);

type Props = {
  id: string;
};

const EditarMentoria: FC<Props> = ({ id }) => {
  const [currentModal, setCurrentModal] = useState<{
    onChange: any;
    type: string;
    refId?: string;
    area_id?: string;
    data?: any;
    rows?: any[];
  }>();
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState<DnDObject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const theme = useTheme();
  const Image = '/svgs/step-image.svg';

  const route = useRouter();
  const { steps: stepsData, mutate } = useMemberAreaTools(id);

  useEffect(() => {
    setSteps((oldSteps) => {
      oldSteps = [...OrganizeTools(stepsData)];
      return [...oldSteps];
    });
  }, [stepsData]);

  const addNewTool = useCallback((title, description, type, group_id) => {
    const newTool = {
      id: Math.random() + '',
      title: title,
      description: description,
      type,
    };

    setSteps((oldSteps) => {
      const index = oldSteps.findIndex((stp) => stp.id === group_id);
      if (!oldSteps[index].rows) oldSteps[index].rows = [];
      oldSteps[index].rows.push(newTool);

      return [...oldSteps];
    });
  }, []);

  const addNewGroup = useCallback(() => {
    const newStep = {
      id: Math.random() + '',
      title: 'Novo Agrupador de Etapas ' + (steps.length + 1),
      type: '0',
      rows: [],
    };

    setSteps((oldSteps) => {
      if (!oldSteps) oldSteps = [];

      oldSteps.push(newStep);
      return [...oldSteps];
    });
  }, [steps]);

  const handleOpenToolsModal = useCallback(
    (group_id) => {
      setCurrentModal({
        onChange: (tool: MentorTools.ToolType) => {
          addNewTool(
            `Nova Etapa ${
              steps.find((stp) => stp.id === group_id).rows.length + 1
            }`,
            tool.description,
            tool.id,
            group_id,
          );
        },
        type: ToolListNames.ToolList.name,
      });
      setOpen(true);
    },
    [addNewTool, steps],
  );

  const HandleModal = useCallback(() => {
    return (
      <SwitchModal
        open={open}
        setOpen={setOpen}
        onChange={currentModal.onChange}
        type={currentModal.type}
        refId={currentModal.refId}
        area_id={id}
        data={currentModal.data}
        rows={currentModal.rows}
      />
    );
  }, [currentModal, open, id]);

  const handleSave = useCallback(async () => {
    // timout para dar tempo para as imagens se organizarem
    setTimeout(async function () {
      await UpdateMemberAreaTools(id, steps);
      mutate();
    }, 1000);
  }, [id, mutate, steps]);

  // refId é enviado automaticamente antes de chegar aqui.
  const GetOnChange = useCallback(
    async ({ refId, data }) => {
      if (data.toRemove) {
        await FilesToDelete(data.toRemove);
        delete data.toRemove;
      }
      let stepIndex = steps.findIndex(
        (stp) => stp.rows.findIndex((row) => row.id === refId + '') >= 0,
      );
      if (stepIndex >= 0) {
        setSteps((oldSteps) => {
          Object.assign(
            oldSteps[stepIndex].rows.find((r) => r.id === refId + ''),
            data,
          );
          return [...oldSteps];
        });
      } else {
        stepIndex = steps.findIndex((row) => row.id === refId + '');

        setSteps((oldSteps) => {
          Object.assign(oldSteps[stepIndex], data);
          
          return [...oldSteps];
        });
      }
      handleSave();
    },
    [handleSave, steps],
  );

  const GetTypeName = useCallback((type) => {
    return Object.values(ToolListNames).find((i) => {
      return i.id == parseInt(type);
    }).name;
  }, []);

  const hasChanges = useCallback(() => {
    // verifica se todos os elementos do array são iguais
    if (!steps || steps.length === 0) return false;
    const haschanges =
      JSON.stringify(OrganizeTools(stepsData)) !== JSON.stringify(steps);

    return haschanges;
  }, [steps, stepsData]);

  return (
    <>
      <ButtonsWrapper>
        <ReturnButton
          variant="text"
          sx={{
            width: '12.5rem',
            height: '2.5rem',
            textTransform: 'none',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
          onClick={() => route.back()}
        >
          <ChavronLeftSvg />
          <span>Voltar</span>
        </ReturnButton>
        <SaveButton
          sx={{
            float: 'right',
            marginLeft: '2rem',
          }}
          variant="outlined"
          color="primary"
          onClick={() => handleSave()}
          loading={isLoading}
          disabled={!hasChanges() || isLoading}
        >
          <Save />
          <Typography variant="body2" ml={1}>
            Salvar alterações
          </Typography>
        </SaveButton>
      </ButtonsWrapper>

      <CustomTypograpy>
        Construa abaixo as etapas/tarefas que seus membros irão percorer. Você
        poderá adicionar, remover ou alterar posteriormente. Você também pode
        mover de ordem as etapas e tarefas.
      </CustomTypograpy>
      <Divider
        sx={{
          borderColor: `${theme.palette.tertiary.light}`,
          marginBottom: '1.0rem',
        }}
      />
      <Box display="flex" alignSelf="end" gap={2} mb={2}>
        <AddGroup
          onClick={() => addNewGroup()}
          variant="contained"
          color="secondary"
        >
          <Workspaces />
          Adicionar Agrupador
        </AddGroup>
      </Box>
      <ScrollWrapper withtoolbar="true">
        <DragNDrop
          setElements={setSteps}
          groupModel={(group_id, child) => {
            if (!steps || steps.length === 0) return child;
            const step = steps.find((i) => i.id === group_id);
            return (
              <GroupWrapper key={group_id}>
                <EditMembersAreaSteps
                  isHeader
                  title={step.title || 'Nova etapa'}
                  stepType={0}
                  image={step?.extra ? step?.extra[0]?.sourceUrl : Image}
                  onEdit={() => {
                    const type = GetTypeName(0);
                    setCurrentModal({
                      onChange: GetOnChange,
                      type,
                      refId: group_id + '',
                      data: step || {},
                      rows: step.rows,
                    });
                    setOpen(true);
                  }}
                  id={group_id + ''}
                />

                <GroupHeader>{child}</GroupHeader>
                <AddTool
                  onClick={() => handleOpenToolsModal(group_id)}
                  variant="contained"
                >
                  <Task />
                  Adicionar Etapa
                </AddTool>
              </GroupWrapper>
            );
          }}
          model={(stp) => {
            if (!stp) return null;

            return (
              <EditMembersAreaSteps
                title={stp?.title || 'Nova etapa'}
                stepType={stp.type}
                image={Image}
                onEdit={() => {
                  const type = GetTypeName(stp.type);
                  setCurrentModal({
                    onChange: GetOnChange,
                    type,
                    refId: stp.id,
                    data: stp || {},
                  });
                  setOpen(true);
                }}
                id={stp.id}
              />
            );
          }}
          elements={steps}
        />
      </ScrollWrapper>
      {open && HandleModal()}
    </>
  );
};

export default EditarMentoria;
