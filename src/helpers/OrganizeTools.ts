import { DnDObject } from '~/components/modules/DragNDrop';

export const OrganizeTools = (
  data: MentorTools.ToolData[],
  filterByTypeId?,
) => {
  if (!data) return [];
  const sortedData = data
    .filter(
      (d) =>
        !filterByTypeId ||
        d.mentor_tool === 0 ||
        d.mentor_tool === filterByTypeId,
    )
    .sort((a, b) => a.order - b.order);
  if (!sortedData) return [];

  const steps: DnDObject[] = [];
  let countSteps = 0;

  for (let i = 0; i < sortedData.length; i++) {
    const isStep = sortedData[i].mentor_tool === 0;

    if (isStep) {
      steps.push({
        id: sortedData[i].id,
        title: sortedData[i].title,
        description: sortedData[i].description,
        data: sortedData[i].data,
        extra: sortedData[i].extra,
        rows: [],
      });
      countSteps++;
    } else {
      if (i === 0) {
        steps.push({
          id: '0',
          title: 'Agrupador Padrão',
          rows: [
            {
              id: sortedData[i].id,
              title: sortedData[i].title,
              description: sortedData[i].description,
              data: sortedData[i].data,
              extra: sortedData[i].extra,
              mentor_tool: sortedData[i].mentor_tool,
            },
          ],
        });
      } else {
        steps[countSteps - 1].rows.push({
          id: sortedData[i].id,
          title: sortedData[i].title,
          description: sortedData[i].description,
          data: sortedData[i].data,
          extra: sortedData[i].extra,
          mentor_tool: sortedData[i].mentor_tool,
        });
      }
    }
  }

  return steps;
};
