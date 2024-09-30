import { useTransactionModal } from '@/hooks/useModalState';
import { InvestmentCardProps } from '@/@types/InvestmentCard';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from "@/components/ui/button"
import { Container } from '@/components/Simulator/Container/Container';
import { Chart } from '@/components/Simulator/Chart/Chart';
import { ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function InvestmentCard({ title, description }: InvestmentCardProps) {
  const { openModal } = useTransactionModal();

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

        <div className='mt-5'>
          <Button onClick={openModal}>Buy/Sell</Button>
        </div>
      </Container>
    </div>
  );
}
