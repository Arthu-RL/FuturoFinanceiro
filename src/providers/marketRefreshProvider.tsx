import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useInvestmentAssets } from './InvestmentAssetsProvider';
import { 
  assetCalculateDrift,
  assetCalculateVolatility,
  assetCalculateTypeMultiplier,
  assetCalculateChanceOfLoss } from '@/utils/asset';
import { toast } from 'sonner';

type MarketRefreshState = { remainingSeconds: number };

const SIXTY_SECONDS = 60;
const ONE_SECOND_IN_MS = 1000;
const MINIMUM_PRICE = 0.01;
const MarketRefreshProviderContext = createContext<MarketRefreshState>({ remainingSeconds: SIXTY_SECONDS });

const MarketRefreshProvider = ({ children }: { children: ReactNode }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(SIXTY_SECONDS);
  const { assets, updateAssets } = useInvestmentAssets();

  const refreshMarket = useCallback(() => {
    const updatedAssets = assets.map((asset) => {
      // Calcular a média dos últimos 50 (máximo) valores no histórico
      const recentHistory = asset.history.slice(-Math.min(asset.history.length, 50));
      const recentAverage = recentHistory.reduce((sum, entry) => sum + entry.value, 0) / Math.min(asset.history.length, 50) || asset.value.current;
      const valuationFactor = asset.value.current / recentAverage;

      // Calcula parametros de variação (Drift, Volatility, ChanceOfLoss)
      const drift = assetCalculateDrift(asset.profile);
      const volatility = assetCalculateVolatility(asset.profile);
      const typeMultiplier = assetCalculateTypeMultiplier(asset.type);
      const chanceOfLoss = assetCalculateChanceOfLoss(asset.profile, valuationFactor);

      // Determine a direção de variação do drift do ativo de acordo com a chance de perda
      const adjustedDrift = Math.random() < chanceOfLoss ? -Math.abs(drift) : drift;

      // Variação de preço
      const randomShock = (Math.random() * volatility - volatility*0.5) * typeMultiplier;
      const randomVariation = adjustedDrift + randomShock;
      const newValue = asset.value.current * (1 + randomVariation);
      const adjustedValue = newValue < MINIMUM_PRICE ? MINIMUM_PRICE * (1 + Math.abs(randomVariation)) : newValue;
      const updatedHistory = [...asset.history, { value: asset.value.current, timestamp: Date.now() }];

      return {
        ...asset,
        value: { previous: asset.value.current, current: adjustedValue },
        history: updatedHistory,
      };
    });

    updateAssets(updatedAssets);
  }, [assets, updateAssets]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    function decrementRemainingSeconds() {
      const innerTimeout = setTimeout(() => {
        setRemainingSeconds((currentSeconds) => {
          if (currentSeconds <= 1) {
            refreshMarket();

            toast.message('Novas Cotações Disponíveis!', {
              duration: 8000,
              description:
                'Os preços foram atualizados com sucesso. Confira as novas mudanças no mercado e ajuste seus investimentos!',
            });

            return SIXTY_SECONDS;
          }

          return --currentSeconds;
        });

        decrementRemainingSeconds();
      }, ONE_SECOND_IN_MS);

      timeout = innerTimeout;
    }

    decrementRemainingSeconds();
    return () => clearTimeout(timeout);
  }, [refreshMarket]);

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
