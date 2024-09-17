import React, { createContext, useContext, useState, useEffect } from 'react';

type BalanceContextType = {
  balance: number;
  setBalance(value: number): void;
};

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function useBalance(): BalanceContextType {
  const context = useContext(BalanceContext);
  if (!context) throw new Error('There is no context (undefined)');
  return context;
}

export function BalanceProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [balance, setBalance] = useState<number>(1000);

  useEffect(() => {
    const storedBalance = localStorage.getItem('balance');
    if (storedBalance) setBalance(Number(storedBalance));
    else localStorage.setItem('balance', '1000');
  }, []);

  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
  }, [balance]);

  return <BalanceContext.Provider value={{ balance, setBalance }}>{children}</BalanceContext.Provider>;
}
