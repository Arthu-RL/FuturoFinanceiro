import { BalanceContext } from '@/providers/balanceProvider';
import { useContext } from 'react';

export function useBalance() {
  const context = useContext(BalanceContext);
  if (!context) throw new Error('There is no context (undefined)');
  return context;
}
