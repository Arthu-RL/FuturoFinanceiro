import { Card } from '@/components/ui/card';
import { useBalance } from '@/hooks/useBalance';

export function Balance() {
  const { balance } = useBalance();

  return (
      <Card className='p-4'>
        <p>Saldo: {balance}</p>
      </Card>
  );
}
