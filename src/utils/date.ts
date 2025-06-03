export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return date;
  }
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};
