export const formattedDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const completeDay = day < 10 ? `0${day}` : day;
  const completeMonth = month < 10 ? `0${month}` : month;

  return `${completeDay}/${completeMonth}/${year}`;
}
