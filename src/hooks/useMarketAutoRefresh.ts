import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useInvestmentAssets } from '@/providers/InvestmentAssetsProvider';
import { useAssetFluctuation } from './useAssetFluctuation';

const ONE_SECOND_IN_MS = 1000;

export const useMarketAutoRefresh = (initialRemainingSeconds: number) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialRemainingSeconds);
  const { assets, updateAssets } = useInvestmentAssets();
  const { computedAssets } = useAssetFluctuation(assets);

  const refreshMarket = useCallback(() => {
    updateAssets(computedAssets);
  }, [computedAssets, updateAssets]);

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

            return initialRemainingSeconds;
          }

          return --currentSeconds;
        });

        decrementRemainingSeconds();
      }, ONE_SECOND_IN_MS);

      timeout = innerTimeout;
    }

    decrementRemainingSeconds();
    return () => clearTimeout(timeout);
  }, [initialRemainingSeconds, refreshMarket]);

  return { remainingSeconds };
};
