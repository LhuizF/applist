export const formattedDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear().toString().slice(-2);
  const hours = newDate.getHours().toString().padStart(2, '0');
  const minutes = newDate.getMinutes().toString().padStart(2, '0');
  const seconds = newDate.getSeconds().toString().padStart(2, '0');

  const days = `${day}/${month}/${year}`
  const hoursMinutes = `${hours}:${minutes}:${seconds}`

  return `${days} ${hoursMinutes}`;
}
