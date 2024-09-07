import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Invest() {
  return (
    <div className='max-w-[50%]'>
      <Card>
        <CardHeader>
          <CardTitle>Investimento risco baixo</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Investimento risco médio</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Investimento risco alto</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
