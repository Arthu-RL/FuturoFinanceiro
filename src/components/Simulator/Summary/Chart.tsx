import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/currency';
import { Activity } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { getCurrentWeekChartData } from '@/utils/chart';
import { useUserAccount } from '@/providers/userAccountProvider';
import { calculateWeekTotalProfit } from '@/utils/number';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { usePreviousValue } from '@/hooks/usePreviousValue';
import { getWeekdayLabelFromDate } from '@/utils/date';

export const Chart = () => {
  const { user } = useUserAccount();
  const chartData = getCurrentWeekChartData(user.profitabilityHistory);
  const weekTotalProfitability = calculateWeekTotalProfit(chartData);
  const { value, previousValue } = usePreviousValue(weekTotalProfitability);

  const startValue = previousValue > 0 ? previousValue : 0;
  const endValue = value > 0 ? value : 0;
  const { count, countTextColor } = useAnimatedCounter(startValue, endValue, 3000);

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--accent-foreground))',
    },
    mobile: {
      label: 'Mobile',
      color: 'hsl(var(--accent-foreground))',
    },
  } satisfies ChartConfig;

  return (
    <Card className='grid grid-rows-[0.5fr_auto]'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Lucro Semanal</CardTitle>
        <Activity className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent className='grid grid-rows-[2rem_1rem_auto]'>
        <div className={`text-2xl font-bold ${countTextColor}`}>{formatCurrency(count, 'BRL', 'pt-BR')}</div>
        <p className='text-xs text-muted-foreground'>Lucro acumulado nesta semana</p>
        <ChartContainer config={chartConfig} className='max-h-[160px] w-full'>
          <LineChart data={chartData} accessibilityLayer margin={{ top: 25, left: 15, right: 15 }}>
            <CartesianGrid vertical={false} opacity={1} />
            <XAxis
              dataKey='date'
              tickMargin={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => getWeekdayLabelFromDate(value)}
            />
            <ChartTooltip
              cursor={false}
              labelFormatter={(value) => getWeekdayLabelFromDate(value)}
              content={
                <ChartTooltipContent
                  indicator='line'
                  customLabel='Lucro Diário:'
                  numberFormatter={(value) => formatCurrency(value, 'BRL', 'pt-BR')}
                />
              }
            />
            <Line
              strokeWidth={2}
              activeDot={{ r: 5, fill: 'var(--color-desktop)' }}
              dataKey='profitability'
              type='monotone'
              stroke='hsl(var(--muted))'
              dot={{ fill: 'var(--color-desktop)' }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
