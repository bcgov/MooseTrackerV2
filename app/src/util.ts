export const formatDateString = (date: Date | string): string => {
  if (date instanceof Date)
    return date.toISOString().slice(0,10);
  else
    return date.split("T")[0];
}
