export const getProgress = (ids, userInput) => {
  let progress = 0;
  ids.forEach((id) => {
    const inputDone = userInput.find((i) => i.member_area_tool_id === id);
    if (inputDone) progress++;
  });
  return ids.length > 0 ? (progress / ids.length) * 100 : 0;
};

export const getProgressByStep = (step, userInput) => {
  const ids = step.rows.map((r) => r.id);
  return getProgress(ids, userInput);
};
