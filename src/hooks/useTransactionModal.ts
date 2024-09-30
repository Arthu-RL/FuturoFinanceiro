import { TransactionModalContext } from '@/providers/providers';
import { useContext } from 'react';

export const useTransactionModal = () => {
  const context = useContext(TransactionModalContext);
  if (!context) throw new Error('useTransactionModal must be used within a ModalContext');
  return context;
};
