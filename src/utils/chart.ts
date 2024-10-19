import { User } from '@/lib/schemas/user.schema';
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import { getWeekdayLabelFromDate } from './date';

function getCurrentWeekChartData(profitabilityHistory: User['profitabilityHistory']) {
  const daysOfWeek = eachDayOfInterval({ start: startOfWeek(new Date()), end: endOfWeek(new Date()) });

  return daysOfWeek.map((weekday) => {
    const data = profitabilityHistory.find(({ date }) => weekday.toString() === date.toString());
    if (!data || data.profitability < 0) return { date: getWeekdayLabelFromDate(weekday), profitability: 0 };
    return { date: getWeekdayLabelFromDate(data.date), profitability: data.profitability };
  });
}

export { getCurrentWeekChartData };
