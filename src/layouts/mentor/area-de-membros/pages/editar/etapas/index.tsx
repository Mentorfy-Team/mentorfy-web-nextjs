import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Workspaces } from '@mui/icons-material';
import Save from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { GroupTools } from '~/components/modules/DragNDrop';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
import { ToolListNames } from '~/layouts/mentor/area-de-membros/helpers/SwitchModal';
import SwitchModal from '~/layouts/mentor/area-de-membros/helpers/SwitchModal';
import { FilesToDelete } from '~/services/file-upload.service';
import { UpdateMemberAreaTools } from '~/services/member-area.service';
import { userStore } from '~/stores';
import {
  AddGroup,
  ButtonsWrapper,
  CustomTypograpy,
  SaveButton,
  ScrollWrapper,
} from '../styles';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const CreateDnDRows = dynamic(() => import('./helpers/CreateDnDRows'), {
  ssr: false,
});
const DragNDrop = dynamic(() => import('~/components/modules/DragNDrop'), {
  ssr: false,
});

type Props = {
  id: string;
  product: any;
  readOnly: boolean;
};

type ModalType = {
  onChange: any;
  type: string;
  refId?: string;
  area_id?: string;
  data?: any;
  rows?: any[];
};

const EditarMentoria: FC<Props> = ({ id, product, readOnly }) => {
  const [currentModal, setCurrentModal] = useState<ModalType>();
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState<GroupTools[]>([]);
  const { isLoading, setLoading } = userStore();
  const theme = useTheme();
  const Image = '/svgs/step-image.svg';

  const route = useRouter();
  const { steps: stepsData, mutate } = useMemberAreaTools(id);

  useEffect(() => {
    if (stepsData) setSteps(JSON.parse(JSON.stringify(stepsData)));
  }, [stepsData]);

  const addNewTool = useCallback((title, description, type, group_id) => {
    const newTool = {
      id: Math.random() + '',
      title: title,
      description: description,
      type,
      parent: group_id,
    } as MentorTools.ToolData;

    setSteps((oldSteps) => {
      const index = oldSteps.findIndex((stp) => stp.id === group_id);
      if (index >= 0) {
        if (!oldSteps[index]?.rows) oldSteps[index].rows = [];
        oldSteps[index].rows.push(newTool);
      } else {
        const index = oldSteps.findIndex((stp) =>
          stp.rows.find((row) => row.id === group_id),
        );
        if (index >= 0) {
          const rowIndex = oldSteps[index].rows.findIndex(
            (row) => row.id === group_id,
          );
          if (!oldSteps[index].rows[rowIndex].rows)
            oldSteps[index].rows[rowIndex].rows = [];
          oldSteps[index].rows[rowIndex].rows.push(newTool);
        }
      }
      return [...oldSteps];
    });
  }, []);

  const addNewGroup = useCallback(
    (parentId?) => {
      const newGroup = {
        id: Math.random() + '',
        title:
          `${
            parentId
              ? `${parentId ? 'Nova categoria' : 'Novo m??dulo'}`
              : `${product.deliver === '4' ? 'Novo m??dulo' : 'Novo m??dulo'}`
          }  ` + (parentId ? '' : steps.length + 1),
        description: '',
        type: 0,
        parent: parentId,
      } as MentorTools.ToolData & { rows: MentorTools.ToolData[] };

      setSteps((oldSteps) => {
        if (!oldSteps) oldSteps = [];

        // find in tree the parent
        if (parentId) {
          const parentIndex = oldSteps.findIndex(
            (stp) =>
              stp.id === parentId ||
              (stp.rows && stp.rows.find((row) => row.id === parentId)),
          );

          if (parentIndex >= 0) {
            if (!oldSteps[parentIndex].rows) oldSteps[parentIndex].rows = [];
            oldSteps[parentIndex].rows.push(newGroup);
          }
        } else {
          oldSteps.push(newGroup);
        }
        return [...oldSteps];
      });
    },
    [product?.deliver, steps.length],
  );

  const handleOpenToolsModal = useCallback(
    (group_id) => {
      setCurrentModal({
        onChange: (tool: MentorTools.ToolType) => {
          addNewTool(
            tool.name || 'Nova Etapa',
            tool.description,
            tool.id,
            group_id,
          );
        },
        type: ToolListNames.ToolList.name,
      });
      setOpen(true);
    },
    [addNewTool],
  );

  const GetTypeName = useCallback((type) => {
    return Object.values(ToolListNames).find((i) => {
      return i.id == parseInt(type);
    })?.name;
  }, []);

  const HandleModal = useCallback(() => {
    return (
      <SwitchModal
        open={open}
        setOpen={setOpen}
        onChange={currentModal.onChange}
        type={GetTypeName(currentModal.type)}
        refId={currentModal.refId}
        area_id={id}
        area_type={product.deliver}
        data={currentModal.data}
        rows={currentModal.rows}
        readOnly={readOnly}
      />
    );
  }, [open, currentModal, GetTypeName, id, product, readOnly]);

  const handleSave = useCallback(async () => {
    setLoading(true);
    // timout para dar tempo para as imagens se organizarem
    setTimeout(async () => {
      await UpdateMemberAreaTools(id, steps);
      await mutate([]);
      toast.success('Altera????es salvas com sucesso', { autoClose: 2000 });
      setTimeout(() => {
        setLoading(false);
      }, 250);
    }, 1000);
  }, [id, mutate, setLoading, steps]);

  // refId ?? enviado automaticamente antes de chegar aqui.
  const GetOnChange = useCallback(
    async ({ refId, data }) => {
      if (data.toRemove) {
        await FilesToDelete(data.toRemove);
        delete data.toRemove;
      }
      const groupIndex = steps.findIndex(
        (s) =>
          s.id === refId ||
          s.rows?.findIndex(
            (c) => c.id === refId + '' || c.rows?.find((t) => t.id === refId),
          ) >= 0,
      );

      const categoryIndex = steps[groupIndex]?.rows?.findIndex(
        (c) =>
          c.id === refId ||
          c.rows?.findIndex((row) => row.id === refId + '') >= 0,
      );

      const categoryRows = steps[groupIndex]?.rows || [];
      const taskIndex = categoryRows[categoryIndex]?.rows?.findIndex(
        (t) => t.id === refId,
      );

      if (taskIndex >= 0) {
        setSteps((oldSteps) => {
          Object.assign(
            oldSteps[groupIndex].rows[categoryIndex].rows[taskIndex],
            data,
          );
          return [...oldSteps];
        });
      } else if (categoryIndex >= 0) {
        setSteps((oldSteps) => {
          Object.assign(oldSteps[groupIndex].rows[categoryIndex], data);
          return [...oldSteps];
        });
      } else if (groupIndex >= 0) {
        if (data.delete) {
          setSteps((oldSteps) => {
            Object.assign(oldSteps[groupIndex], data);
            oldSteps[groupIndex].rows = oldSteps[groupIndex].rows?.map(
              (tasks) => {
                tasks.delete = true;
                return { ...tasks };
              },
            );
            return [...oldSteps];
          });
        } else {
          setSteps((oldSteps) => {
            Object.assign(oldSteps[groupIndex], data);
            return [...oldSteps];
          });
        }
      }
      handleSave();
    },
    [handleSave, steps],
  );

  const hasChanges = useMemo(() => {
    // verifica se todos os elementos do array s??o iguais
    if (stepsData.length && steps.length)
      if (!steps || steps.length === 0) return false;
    const haschanges = JSON.stringify(stepsData) !== JSON.stringify(steps);

    return haschanges;
  }, [steps, stepsData]);

  const DnDRows = useCallback(
    (values: GroupTools[]) => {
      if (!values || values.length === 0) return <></>;
      const allowSubGroups = product?.member_area?.type_id === 3;
      const productType = product.deliver === '4' ? true : false;

      return (
        <SortableContext
          items={(values[0].rows || []).map((i) => i.id + '')}
          strategy={verticalListSortingStrategy}
        >
          <CreateDnDRows
            rows={values}
            onEdit={(step) => {
              setCurrentModal({
                onChange: GetOnChange,
                type: step.type,
                refId: step.id + '',
                data: step || {},
                rows: step.rows,
              });
              setOpen(true);
            }}
            onOpenModal={handleOpenToolsModal}
            onNewGroup={(id) => addNewGroup(id)}
            allowSubgroup={allowSubGroups}
            productType={productType}
            readOnly={readOnly}
          />
        </SortableContext>
      );
    },
    [GetOnChange, addNewGroup, handleOpenToolsModal, product, readOnly],
  );

  return (
    <>
      <ContentWidthLimit maxWidth={700}>
        <ButtonsWrapper>
          <div />
          <SaveButton
            sx={{
              float: 'right',
              marginLeft: '2rem',
            }}
            variant="outlined"
            color="primary"
            onClick={() => handleSave()}
            loading={isLoading}
            disabled={!hasChanges || isLoading || readOnly}
          >
            <Save />
            <Typography
              sx={{ color: isLoading ? 'transparent' : null }}
              variant="body2"
              ml={1}
            >
              Salvar altera????es
            </Typography>
          </SaveButton>
        </ButtonsWrapper>

        <CustomTypograpy>
          Construa abaixo as etapas/tarefas que seus membros ir??o percorer. Voc??
          poder?? adicionar, remover ou alterar posteriormente. Voc?? tamb??m pode
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
            disabled={readOnly}
            onClick={() => addNewGroup()}
            variant="contained"
            color="secondary"
          >
            <Workspaces />
            {product?.deliver === '4' ? 'Adicionar M??dulo' : 'Adicionar M??dulo'}
          </AddGroup>
        </Box>
        <ScrollWrapper withtoolbar="true">
          <DragNDrop
            setElements={setSteps}
            steps={steps}
            elements={DnDRows(steps)}
            allowOverlay={product.deliver === '3'}
          />
        </ScrollWrapper>
        {open && HandleModal()}
      </ContentWidthLimit>
    </>
  );
};

export default EditarMentoria;
