export const formatDateNoTime = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
