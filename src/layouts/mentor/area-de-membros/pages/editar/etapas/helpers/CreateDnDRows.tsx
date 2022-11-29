import { AddBox, Task } from '@mui/icons-material';
import EditMembersAreaSteps from '~/components/modules/EditMembersAreaSteps';
import { AddCategory, AddTool, GroupWrapper } from '../../styles';

const CreateDnDRows = (
  rows: any[],
  onEdit,
  onOpenModal,
  onNewGroup,
  allowSubgroup = false,
) => {
  const Group = ({ step, children, isGroup }) => {
    return (
      <GroupWrapper
        sx={{
          margin: !isGroup ? '1rem' : '0',
        }}
      >
        <EditMembersAreaSteps
          isHeader
          title={step.title}
          stepType={0}
          image={step.extra ? step.extra[0]?.sourceUrl : null}
          onEdit={onEdit}
          step={step}
        />

        {children}
        {isGroup && allowSubgroup && (
          <AddCategory onClick={() => onNewGroup(step.id)}>
            <AddBox />
            Adicionar Categoria
          </AddCategory>
        )}
        {(!isGroup || !allowSubgroup) && (
          <AddTool onClick={() => onOpenModal(step.id)} variant="contained">
            <Task />
            Adicionar Etapa
          </AddTool>
        )}
      </GroupWrapper>
    );
  };

  return rows.map((row) => {
    return (
      <Group key={row.id} step={row} isGroup={row.type == 0}>
        {row.rows?.map((child: any) => {
          if (child.type == 0 && allowSubgroup) {
            return (
              <Group key={child.id} step={child} isGroup={!child.parent}>
                {child.rows?.map((subChild: any) => (
                  <EditMembersAreaSteps
                    key={subChild.id}
                    title={subChild.title}
                    stepType={subChild.type}
                    image={subChild.extra ? subChild.extra[0]?.sourceUrl : null}
                    onEdit={onEdit}
                    step={subChild}
                  />
                ))}
              </Group>
            );
          } else {
            return (
              <EditMembersAreaSteps
                key={child.id}
                title={child.title}
                stepType={child.type}
                image={child.extra ? child.extra[0]?.sourceUrl : null}
                onEdit={onEdit}
                step={child}
              />
            );
          }
        })}
      </Group>
    );
  });
};

export default CreateDnDRows;