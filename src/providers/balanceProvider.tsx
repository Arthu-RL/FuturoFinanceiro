import { useState, useEffect } from 'react';
import { BalanceContext } from './providers';

export function BalanceProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [balance, setBalance] = useState<number>(Number(localStorage.getItem('balance') || 1000));

  function updateBalance(balance: number) {
    localStorage.setItem('balance', balance.toString());
    setBalance(balance);
  }

  useEffect(() => {}, [balance]);

  return <BalanceContext.Provider value={{ balance, updateBalance }}>{children}</BalanceContext.Provider>;
}
