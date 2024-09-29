import { BalanceContext } from '@/providers/providers';
import { useContext } from 'react';

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) throw new Error('useBalance must be used within a BalanceProvider');
  return context;
};
