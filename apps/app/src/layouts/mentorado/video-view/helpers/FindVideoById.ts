import { GroupTools } from '@app/components/modules/DragNDrop';

export const FindVideoById = (id: string, steps: GroupTools[]) => {
  // return parent index and child index
  let stepIndex: number;
  let rowIndex: number;

  steps.forEach((step, i) => {
    step.rows?.forEach((row, j) => {
      if (row.id === id) {
        stepIndex = i;
        rowIndex = j;
      }
    });
  });

  if (stepIndex == null && !rowIndex == null) {
    return null;
  }

  return {
    module: steps[stepIndex],
    module_index: stepIndex,
    video: steps[stepIndex]?.rows[rowIndex],
    video_index: rowIndex,
  };
};
