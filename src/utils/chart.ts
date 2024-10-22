import { Assets } from '@/lib/schemas/assets.schema';
import { User } from '@/lib/schemas/user.schema';
import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';

function generateCurrentWeekData(profitabilityHistory: User['profitabilityHistory']) {
  const daysOfWeek = eachDayOfInterval({ start: startOfWeek(new Date()), end: endOfWeek(new Date()) });
  return daysOfWeek.map((weekday) => {
    const weekdayHistory = profitabilityHistory.find(({ date }) => weekday.toString() === date.toString());
    if (!weekdayHistory) return { date: weekday.toString(), profitability: 0 };
    return { date: weekdayHistory.date.toString(), profitability: weekdayHistory.profitability };
  });
}

function generateAssetHistoryChartData(assetHistory: Assets['history']) {
  return assetHistory.map(({ value, timestamp }) => ({ value, timestamp: timestamp.toString() }));
}

export { generateCurrentWeekData, generateAssetHistoryChartData };
