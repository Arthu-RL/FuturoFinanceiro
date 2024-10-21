import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { formatCurrency } from '@/utils/currency';
import { formatLabelTimestamp, formatTickTimestamp } from '@/utils/date';
import { Assets } from '@/lib/schemas/assets.schema';
import { generateAssetHistoryChartData } from '@/utils/chart';

type Chart = {
  assetHistory: Assets['history'];
};

export const Chart = ({ assetHistory }: Chart) => {
  const lastTenEntries = generateAssetHistoryChartData(assetHistory).slice(assetHistory.length - 10);

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
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-5 py-3'>
          <CardTitle className='text-lg font-semibold'>Histórico de Preços Recentes</CardTitle>
          <CardDescription>
            Este gráfico apresenta os últimos valores do ativo, destacando as tendências e variações de preço.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className={`${assetHistory.length ? 'px-4' : 'px-2'} py-2`}>
        {assetHistory.length ? (
          <ChartContainer config={chartConfig} className='aspect-auto h-[250px] w-full'>
            <LineChart accessibilityLayer data={lastTenEntries} margin={{ left: 15, right: 15, top: 10 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                dataKey='timestamp'
                tickFormatter={(value) => formatTickTimestamp(new Date(value))}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className='w-[150px] whitespace-nowrap'
                    customLabel='Preço:'
                    hideIndicator
                    labelFormatter={(value) => formatLabelTimestamp(new Date(value))}
                    numberFormatter={(value) => formatCurrency(value, 'BRL', 'pt-BR')}
                  />
                }
              />
              <Line
                dot={false}
                dataKey='value'
                type='monotone'
                strokeWidth={2}
                stroke='hsl(var(--accent-foreground))'
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <div className='inset-0 flex h-72 items-center justify-center rounded-b-md text-sm transition-colors hover:bg-muted/50'>
            <span className='max-w-48 text-center text-foreground'>
              Os dados necessários para gerar o gráfico ainda não estão disponíveis.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
