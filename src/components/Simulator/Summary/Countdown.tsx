import { useMarketRefresh } from '@/providers/marketRefreshProvider';
import { formatRemainingTime } from '@/utils/date';

export const Countdown = () => {
  const { remainingSeconds } = useMarketRefresh();

  return (
    <div className='my-auto flex flex-col gap-1 px-0.5'>
      <h1 className='text-3xl font-medium max-2xl:text-2xl'>Simulador de Investimentos</h1>
      <p className='text-sm text-muted-foreground max-2xl:text-xs'>
        Controle seus investimentos e acompanhe o seu progresso.
      </p>
      <p id='refresh' className='w-fit text-sm font-medium text-muted-foreground max-2xl:text-xs'>
        Próxima Atualização em: {formatRemainingTime(remainingSeconds)}
      </p>
    </div>
  );
};
