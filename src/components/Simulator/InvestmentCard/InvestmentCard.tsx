import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Container } from '@/components/Simulator/Container/Container';
import { Chart } from '@/components/Simulator/Chart/Chart';
import { ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

type InvestmentCardProps = {
  title: string;
  description: string;
};

export default function InvestmentCard({ title, description }: InvestmentCardProps) {
  return (
    <div className='mt-10'>
      <Container>
        <div className='flex-1'>
          <CardHeader>
            <CardTitle className='w-[calc(40vw)] p-5 text-[24px]'>{title}</CardTitle>
            <CardDescription className='w-[calc(40vw)] p-5 text-[18px] md:w-auto'>
              {description}
            </CardDescription>
          </CardHeader>
        </div>
        <CardContent className='w-[calc(80vw)] max-w-[800px]'>
          <Chart
            title='Histórico de preços'
            description='Oscilações da moeda *** em um dado período'
            tredingText='Trending up by 5.2% this month'
            period='January - June 2024'
            chartConfig={chartConfig}
          />
        </CardContent>
      </Container>
    </div>
  );
}
