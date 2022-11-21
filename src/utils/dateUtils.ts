export function isToday(date: Date) {
  const current = new Date();
  return (
    date.getDate() === current.getDate() &&
    date.getMonth() === current.getMonth() &&
    date.getFullYear() === current.getFullYear()
  );
}

export function inCurrentMonth(date: Date) {
  const current = new Date();
  return (
    date.getDate() !== current.getDate() &&
    date.getMonth() === current.getMonth() &&
    date.getFullYear() === current.getFullYear()
  );
}

export function addZero(time: number) {
  if (time < 10) return `0${time}`;
  return time;
}

export function parseDate(date: Date) {
  if (isToday(date)) {
    return `${date.getHours()}:${addZero(date.getMinutes())}`;
  }
  if (inCurrentMonth(date)) {
    return `${addZero(date.getDate())}.${date.getMonth() + 1}`;
  }
  return `${addZero(date.getMonth() + 1)}.${date.getFullYear()}`;
}
