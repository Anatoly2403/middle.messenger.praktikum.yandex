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
