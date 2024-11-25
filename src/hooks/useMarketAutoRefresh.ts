import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useInvestmentAssets } from '@/providers/InvestmentAssetsProvider';
import { useAssetFluctuation } from './useAssetFluctuation';
import { useTutorial } from '@/providers/tutorialProvider';
import { useLocation } from 'react-router-dom';

const ONE_SECOND_IN_MS = 1000;
const THREE_MINUTES = 180;

export const useMarketAutoRefresh = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(THREE_MINUTES);
  const { assets, updateAssets } = useInvestmentAssets();
  const { computedAssets } = useAssetFluctuation(assets);
  const { isTutorialActive } = useTutorial();
  const { pathname } = useLocation();

  const refreshMarket = useCallback(() => {
    updateAssets(computedAssets);
  }, [computedAssets, updateAssets]);

  useEffect(() => {
    const isAtHomePage = pathname === '/';

    let timeout: NodeJS.Timeout;

    function decrementRemainingSeconds() {
      const innerTimeout = setTimeout(() => {
        setRemainingSeconds((currentSeconds) => {
          if (currentSeconds <= 1) {
            refreshMarket();

            toast.message('Novas Cotações Disponíveis!', {
              duration: 5000,
              position: 'bottom-right',
              description:
                'Os preços foram atualizados com sucesso. Confira as novas mudanças no mercado e ajuste seus investimentos!',
            });

            return THREE_MINUTES;
          }

          if (isTutorialActive || isAtHomePage) return currentSeconds;
          return --currentSeconds;
        });

        decrementRemainingSeconds();
      }, ONE_SECOND_IN_MS);

      timeout = innerTimeout;
    }

    decrementRemainingSeconds();
    return () => clearTimeout(timeout);
  }, [pathname, isTutorialActive, refreshMarket]);

  return { remainingSeconds };
};
