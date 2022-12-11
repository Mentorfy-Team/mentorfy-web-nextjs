import { AddBox, Task } from '@mui/icons-material';
import EditMembersAreaSteps from '~/components/modules/EditMembersAreaSteps';
import { AddCategory, AddTool, GroupWrapper } from '../../styles';

const CreateDnDRows = (
  rows: any[],
  onEdit,
  onOpenModal,
  onNewGroup,
  allowSubgroup = false,
  productType,
) => {
  const Group = ({ step, children, isGroup }) => {
    return (
      <GroupWrapper
        sx={{
          margin: '1rem',
        }}
      >
        <EditMembersAreaSteps
          isHeader
          title={step.title}
          stepType={0}
          image={step.data ? step.data[0]?.sourceUrl : null}
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
            {productType ? 'Adicionar Aula' : 'Adicionar Etapa'}
          </AddTool>
        )}
      </GroupWrapper>
    );
  };

  return rows.map((row) => {
    return (
      <Group key={row.id} step={row} isGroup={row.type == 0 && allowSubgroup}>
        {row.rows?.map((child: any) => {
          if (child.type == 0 && allowSubgroup) {
            return (
              <Group key={child.id} step={child} isGroup={!child.parent}>
                {child.rows?.map((subChild: any) => (
                  <EditMembersAreaSteps
                    key={subChild.id}
                    title={subChild.title}
                    stepType={subChild.type}
                    image={subChild.data ? subChild.data[0]?.sourceUrl : null}
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
                image={child.data ? child.data[0]?.sourceUrl : null}
                onEdit={onEdit}
                step={child}
                productType={productType}
              />
            );
          }
        })}
      </Group>
    );
  });
};

export default CreateDnDRows;
