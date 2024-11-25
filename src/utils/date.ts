function getWeekdayLabelFromDate(date: Date) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
  return formatter.format(date);
}

function formatRemainingTime(seconds: number) {
  const remainingMinutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingMinutes > 0 ? `${remainingMinutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
}

function formatLabelTimestamp(date: Date) {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return formatter.format(date);
}

function formatTickTimestamp(date: Date) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return formatter.format(date);
}

export { getWeekdayLabelFromDate, formatRemainingTime, formatLabelTimestamp, formatTickTimestamp };
