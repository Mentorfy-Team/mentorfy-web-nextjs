import { GroupTools } from '~/components/modules/DragNDrop';

export const FindNotWatchedVideo = (
  steps: GroupTools[],
  doneList: MemberAreaTypes.UserInput<any, any>[],
) => {
  let stepIndex: number;
  let rowIndex: number;

  steps.forEach((step, i) => {
    if (stepIndex >= 0) return;
    step.rows.forEach((row, j) => {
      if (rowIndex >= 0 || row.type != 4) return;
      if (!doneList.some((done) => done.member_area_tool_id === row.id)) {
        stepIndex = i;
        rowIndex = j;
      }
    });
  });

  return {
    module: steps[stepIndex],
    module_index: stepIndex,
    video: steps[stepIndex]?.rows[rowIndex],
    video_index: rowIndex,
  };
};

export const FindNextVideo = (
  refStepIndex: number,
  refRowIndex: number,
  steps: GroupTools[],
) => {
  let stepIndex: number;
  let rowIndex: number;

  steps.forEach((step, i) => {
    if (stepIndex) return;
    if (i < refStepIndex) return;
    step.rows.forEach((row, j) => {
      if (rowIndex) return;
      if (i > refStepIndex || j <= refRowIndex || row.type != 4) return;
      stepIndex = i;
      rowIndex = j;
    });
  });

  if (stepIndex == null && rowIndex == null) {
    return null;
  }

  return {
    module: steps[stepIndex],
    module_index: stepIndex,
    video: steps[stepIndex]?.rows[rowIndex],
    video_index: rowIndex,
  };
};
