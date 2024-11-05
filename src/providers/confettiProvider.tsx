import { useConfettiAction } from '@/hooks/useConfettiAction';
import { createContext, ReactNode, useContext } from 'react';

type ConfettiProviderState = { handleShootConfetti: () => void };

const ConfettiProviderContext = createContext<ConfettiProviderState>({ handleShootConfetti: () => {} });

const ConfettiProvider = ({ children }: { children: ReactNode }) => {
  const { ConfettiComponent, handleShootConfetti } = useConfettiAction();

  return (
    <ConfettiProviderContext.Provider value={{ handleShootConfetti }}>
      {ConfettiComponent}
      {children}
    </ConfettiProviderContext.Provider>
  );
};

const useConfetti = () => {
  const context = useContext(ConfettiProviderContext);
  if (!context) throw new Error('useConfetti must be used within a ConfettiProvider');
  return context;
};

export { ConfettiProvider, useConfetti };
