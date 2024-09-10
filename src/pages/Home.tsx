import type { ConversionRates } from '@/@types/currency';
import { useFetch } from '@/hooks/useFetch';
import { fetchCurrencyByCode } from '@/services/currency';
import { currencyExchangeRate, formatCurrency } from '@/utils/currency';

export default function Home() {
  const { data, isLoading } = useFetch<ConversionRates>(() => fetchCurrencyByCode('BRL'));
  const value = formatCurrency(currencyExchangeRate('EUR', 'BRL', 1000, data?.brl), 'BRL', 'pt-BR');

  return (
    <div>
      {value}
      <h2>Simulador de Investimentos</h2>
      <p>App disponível para Android e IOS, no link ***</p>
    </div>
  );
}
