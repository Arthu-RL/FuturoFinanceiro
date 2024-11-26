import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { usePreviousValue } from '@/hooks/usePreviousValue';
import { formatCurrency } from '@/utils/currency';
import { Fragment } from 'react/jsx-runtime';

type NumberDisplayProps = {
  value: number;
  animated?: boolean;
  valueDifference: string;
};

export const NumberDisplay = ({ value, valueDifference, animated = false }: NumberDisplayProps) => {
  const { previousValue } = usePreviousValue(value);
  const { count, countTextColor } = useAnimatedCounter(animated ? previousValue : value, value, 2300);

  return (
    <Fragment>
      <div className={`text-2xl font-bold brightness-110 transition-all ${countTextColor}`}>
        {formatCurrency(count, 'BRL', 'pt-BR')}
      </div>
      <p className='text-xs text-muted-foreground'>{valueDifference} em relação ao dia anterior</p>
    </Fragment>
  );
};
