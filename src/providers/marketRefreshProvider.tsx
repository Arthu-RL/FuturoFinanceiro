import { useMarketAutoRefresh } from '@/hooks/useMarketAutoRefresh';
import { createContext, ReactNode, useContext } from 'react';

type MarketRefreshState = { remainingSeconds: number };

const THREE_MINUTES = 180;
const MarketRefreshProviderContext = createContext<MarketRefreshState>({ remainingSeconds: 0 });

const MarketRefreshProvider = ({ children }: { children: ReactNode }) => {
  const { remainingSeconds } = useMarketAutoRefresh(THREE_MINUTES);

  return (
    <MarketRefreshProviderContext.Provider value={{ remainingSeconds }}>
      {children}
    </MarketRefreshProviderContext.Provider>
  );
};

const useMarketRefresh = () => {
  const context = useContext(MarketRefreshProviderContext);
  if (!context) throw new Error('useMarketRefresh must be used within a MarketRefreshProvider');
  return context;
};

export { MarketRefreshProvider, useMarketRefresh };
