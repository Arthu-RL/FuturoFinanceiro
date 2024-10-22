import { Assets } from '@/lib/schemas/assets.schema';
import { User } from '@/lib/schemas/user.schema';
import { eachDayOfInterval, endOfToday, endOfWeek, isBefore, startOfWeek } from 'date-fns';

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
    const historyDate = history.date.toString();

    if (index === 0) {
      return { date: historyDate, profitability: currentDayProfitability };
    }

    if (!isBefore(history.date, endOfToday()) || currentDayProfitability === 0) {
      return { date: historyDate, profitability: 0 };
    }

    const previousDayProfitability = profitabilityHistory[index - 1].profitability;
    const dailyProfit = currentDayProfitability - previousDayProfitability;
    return { date: historyDate, profitability: dailyProfit };
  });
}

function generateAssetHistoryChartData(assetHistory: Assets['history']) {
  return assetHistory.map(({ value, timestamp }) => ({ value, timestamp: timestamp.toString() }));
}

export { generateCurrentWeekChartData, generateCurrentWeekData, generateAssetHistoryChartData };
