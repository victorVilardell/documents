export function convertDateToISO(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format.");
  }
  return date.toISOString();
}
