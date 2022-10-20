import { DnDObject, DnDRow } from '~/components/modules/DragNDrop';

export const OrganizeTools = (data: DnDRow[]) => {
  const sortedData = data.sort((a, b) => a.order - b.order);

  const steps: DnDObject[] = [];
  let countSteps = 0;

  for (let i = 0; i < sortedData.length; i++) {
    const isStep = sortedData[i].type === 0;

    if (isStep) {
      steps.push({
        id: sortedData[i].id,
        title: sortedData[i].title,
        description: sortedData[i].description,
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
              type: sortedData[i].type,
            },
          ],
        });
      } else {
        steps[countSteps - 1].rows.push({
          id: sortedData[i].id,
          title: sortedData[i].title,
          type: sortedData[i].type,
        });
      }
    }
  }

  return steps;
};
