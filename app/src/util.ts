export const formatDateString = (date: Date | string): string => {
  try {
    if (date instanceof Date)
    return date.toISOString().slice(0,10);
  else
    return date.split("T")[0];
  } catch {
    // failsafe, so that we at least don't crash the entire page
    return '';
  }
}
