function getWeekdayLabelFromDate(date: Date) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
  return formatter.format(date);
}

export { getWeekdayLabelFromDate };
