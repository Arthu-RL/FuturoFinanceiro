import { User } from '@/lib/schemas/user.schema';
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import { getWeekdayLabelFromDate } from './date';

function generateCurrentWeekData(profitabilityHistory: User['profitabilityHistory']) {
  const daysOfWeek = eachDayOfInterval({ start: startOfWeek(new Date()), end: endOfWeek(new Date()) });
  return daysOfWeek.map((weekday) => {
    const data = profitabilityHistory.find(({ date }) => weekday.toString() === date.toString());
    if (!data) return { date: weekday, profitability: 0 };
    return { date: data.date, profitability: data.profitability };
  });
}

function generateCurrentWeekChartData(profitabilityHistory: User['profitabilityHistory']) {
  return profitabilityHistory.map((history, index) => {
    const currentDayProfitability = history.profitability;
    const dateLabel = getWeekdayLabelFromDate(history.date);

    if (index === 0) return { date: dateLabel, profitability: currentDayProfitability };
    const previousDayProfitability = profitabilityHistory[index - 1].profitability;
    const dailyProfit = currentDayProfitability - previousDayProfitability;

    return { date: dateLabel, profitability: dailyProfit };
  });
}

export { generateCurrentWeekChartData, generateCurrentWeekData };
