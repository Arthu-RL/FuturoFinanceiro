function getWeekdayLabelFromDate(date: Date) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
  return formatter.format(date);
}

function formatRemainingTime(seconds: number) {
  const minutes = Math.floor((seconds % 3600) / 60);
  const hours = Math.floor(seconds / 3600);

  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}

export { getWeekdayLabelFromDate, formatRemainingTime };
