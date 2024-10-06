import { useState, useEffect, createContext, useContext } from 'react';

type BalanceProviderState = {
  balance: number;
  updateBalance(value: number): void;
};

const BalanceContext = createContext<BalanceProviderState>({
  balance: 1000,
  updateBalance: (value: number) => value,
});

function BalanceProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [balance, setBalance] = useState<number>(Number(localStorage.getItem('balance') || 1000));

  function updateBalance(balance: number) {
    localStorage.setItem('balance', balance.toString());
    setBalance(balance);
  }

  useEffect(() => {
    const storedBalance = localStorage.getItem('balance');
    if (storedBalance) {
      setBalance(Number(storedBalance));
    }
  }, []);

  return <BalanceContext.Provider value={{ balance, updateBalance }}>{children}</BalanceContext.Provider>;
}

const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) throw new Error('useBalance must be used within a BalanceProvider');
  return context;
};

export { BalanceProvider, useBalance };
