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
            <CardTitle
              style={{
                fontSize: '24px',
                width: '40vw',
              }}
              className='p-5'
            >
              {title}
            </CardTitle>
            <CardDescription
              style={{
                fontSize: '18px',
                width: '40vw',
              }}
              className='w-full p-5 md:w-auto'
            >
              {description}
            </CardDescription>
          </CardHeader>
        </div>
        <CardContent
          style={{
            width: '80vw',
          }}
          className='w-full md:w-auto'
        >
          <Chart />
        </CardContent>
      </Container>
    </div>
  );
}
