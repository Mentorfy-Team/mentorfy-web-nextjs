import { FC, useCallback, useEffect, useState } from 'react';
import Save from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { DnDObject } from '~/components/modules/DragNDrop';
import EditMembersAreaSteps from '~/components/modules/EditMembersAreaSteps';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
import {
  ToolListNames,
  ToolsModalProps,
} from '~/layouts/mentor/area-de-membros/helpers/SwitchModal';
import { FilesToDelete } from '~/services/file-upload.service';
import { UpdateMemberAreaTools } from '~/services/member-area.service';
import {
  ButtonsWrapper,
  CustomTypograpy,
  ReturnButton,
  SaveButton,
  ScrollWrapper,
  GroupWrapper,
  GroupHeader,
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
  }>();
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState<DnDObject[]>([
    {
      id: 0,
      title: 'Etapa 1',
      description: 'descrição da etapa 1',
      rows: [],
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const theme = useTheme();
  const Image = '/svgs/step-image.svg';

  const { tools, mutate } = useMemberAreaTools(id);

  useEffect(() => {
    setSteps((oldSteps) => {
      oldSteps[0].rows = [...tools];
      return [...oldSteps];
    });
  }, [tools]);

  const addNewStep = useCallback(
    (title, description, type) => {
      const newStep = {
        id: Math.random() + '',
        title: 'Nova etapa ' + (steps[0].rows.length + 1),
        type,
      };

      setSteps((oldSteps) => {
        if (!oldSteps[0].rows) oldSteps[0].rows = [];

        oldSteps[0].rows.push(newStep);
        return [...oldSteps];
      });
    },
    [steps],
  );

  const hadleOpenToolsModal = useCallback(() => {
    setCurrentModal({
      onChange: (tool: MentorTools.ToolType) => {
        addNewStep(
          `Etapa ${steps[0].rows.length + 1}`,
          tool.description,
          tool.id,
        );
      },
      type: ToolListNames.ToolList.name,
    });
    setOpen(true);
  }, [addNewStep, steps]);

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
      />
    );
  }, [currentModal, open, id]);

  const handleSave = useCallback(async () => {
    // timout para dar tempo para as imagens se organizarem
    setTimeout(async function () {
      await UpdateMemberAreaTools(id, steps[0].rows);
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
      setSteps((oldSteps) => {
        Object.assign(
          oldSteps[0].rows.find((r) => r.id === refId),
          data,
        );
        return [...oldSteps];
      });

      handleSave();
    },
    [handleSave],
  );

  const GetTypeName = useCallback((type) => {
    return Object.values(ToolListNames).find((i) => {
      return i.id == parseInt(type);
    }).name;
  }, []);

  const hasChanges = useCallback(() => {
    // verifica se todos os elementos do array são iguais
    const haschanges = JSON.stringify(tools) !== JSON.stringify(steps[0].rows);

    return haschanges;
  }, [steps, tools]);

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
          marginBottom: '1.8rem',
        }}
      />
      <ScrollWrapper withtoolbar="true">
        <DragNDrop
          setElements={setSteps}
          groupModel={(group_id, child) => {
            return <GroupWrapper key={group_id}>
              <EditMembersAreaSteps
                isHeader
                title={steps[group_id]?.title || 'Nova etapa'}
                stepType={0}
                image={Image}
                onEdit={() => {
                  const type = GetTypeName(0);
                  setCurrentModal({
                    onChange: GetOnChange,
                    type,
                    refId: steps[group_id].id+'',
                    data: steps[group_id] || {},
                  });
                  setOpen(true);
                }}
                id={steps[group_id].id+''}
              />
              <GroupHeader>
              {child}
              </GroupHeader>
            </GroupWrapper>;
          }}
          model={(element_id) => {
            const stp = steps[0].rows.find((stp) => stp.id == element_id);
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Divider
          orientation="vertical"
          sx={{
            borderColor: `${theme.palette.caption.main}`,
            height: '1rem',
            width: '0',
            marginTop: '1.5rem',
          }}
        />
        <Button
          onClick={hadleOpenToolsModal}
          sx={{ color: `${theme.palette.caption.main}` }}
        >
          + ADICIONAR ETAPA
        </Button>
        {open && HandleModal()}
      </Box>
    </>
  );
};

export default EditarMentoria;
