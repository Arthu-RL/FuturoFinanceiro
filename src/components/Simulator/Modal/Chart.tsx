import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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
  const lastTenEntries = generateAssetHistoryChartData(assetHistory).slice(
    assetHistory.length >= 10 ? assetHistory.length - 10 : 0,
  );

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
            <AreaChart
              accessibilityLayer
              data={lastTenEntries}
              margin={{ left: 15, right: 15, top: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray='4 4' />
              <XAxis
                tickLine={false}
                axisLine={false}
                tickMargin={15}
                dataKey='timestamp'
                tickFormatter={(value) => formatTickTimestamp(new Date(value))}
              />
              <YAxis width={0} dataKey='value' domain={['auto', 'auto']} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className='w-fit whitespace-nowrap'
                    customLabel='Preço:'
                    hideIndicator
                    labelFormatter={(value) => formatLabelTimestamp(new Date(value))}
                    numberFormatter={(value) => formatCurrency(value, 'BRL', 'pt-BR')}
                  />
                }
              />
              <defs>
                <linearGradient id='fillValue' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='hsl(var(--muted-foreground))' stopOpacity={0.5} />
                  <stop offset='95%' stopColor='hsl(var(--accent-foreground))' stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                dot={false}
                dataKey='value'
                fill='url(#fillValue)'
                type='natural'
                fillOpacity={0.35}
                stroke='hsl(var(--accent-foreground))'
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className='inset-0 flex h-72 items-center justify-center rounded-b-md text-sm transition-colors hover:bg-muted/50 max-md:h-60'>
            <span className='max-w-48 text-center text-foreground'>
              Os dados necessários para gerar o gráfico ainda não estão disponíveis.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
