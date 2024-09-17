import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Container } from '@/components/Simulator/Container/Container';
import { Chart } from '@/components/Simulator/Chart/Chart';
// import { Label } from '@/components/ui/label';
// import { cn } from '@/lib/utils';

type InvestmentCardProps = {
  title: string;
  description: string;
};

export default function InvestmentCard({ title, description }: InvestmentCardProps) {
  return (
    <div className='p-10'>
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
          <Chart />
        </CardContent>
      </Container>
    </div>
  );
}
