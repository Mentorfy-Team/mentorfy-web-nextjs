export const isExpired = (date: string) => {
  if (!date) return false;
  const today = new Date();
  const dateToCompare = new Date(date);
  return today > dateToCompare;
};
