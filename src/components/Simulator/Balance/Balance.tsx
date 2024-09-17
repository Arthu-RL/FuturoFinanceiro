import { Card } from '@/components/ui/card';
import type { ConversionRates } from '@/@types/currency';
import { useFetch } from '@/hooks/useFetch';
import { fetchCurrencyByCode } from '@/services/currency';
import { currencyExchangeRate, formatCurrency } from '@/utils/currency';

export function Balance() {
  const { data, isLoading } = useFetch<ConversionRates>(() => fetchCurrencyByCode('BRL'));
  const value = formatCurrency(currencyExchangeRate('EUR', 'BRL', 1000, data?.brl), 'BRL', 'pt-BR');

  return (
    <Card className='p-4'>
      <p>Saldo: {value}</p>
    </Card>
  );
}
