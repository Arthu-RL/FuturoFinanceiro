import { useCallback, useEffect, useState } from 'react';
import { useGenerateInvestmentAssets } from './useGenerateInvestmentAssets';
import { toast } from 'sonner';

import {
  assetCalculateDrift,
  assetCalculateVolatility,
  assetCalculateTypeMultiplier,
  assetCalculateChanceOfLoss,
} from '@/utils/asset';

const ONE_SECOND_IN_MS = 1000;
const MINIMUM_PRICE = 0.01;

export const useMarketAutoRefresh = (initialRemainingSeconds: number) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialRemainingSeconds);
  const { assets, updateAssets } = useGenerateInvestmentAssets();

  const refreshMarket = useCallback(() => {
    const updatedAssets = assets.map((asset) => {
      // Calcular a média dos últimos 50 (máximo) valores no histórico
      const recentHistory = asset.history.slice(-Math.min(asset.history.length, 50));
      const recentAverage =
        recentHistory.reduce((sum, entry) => sum + entry.value, 0) / Math.min(asset.history.length, 50) ||
        asset.value.current;
      const valuationFactor = asset.value.current / recentAverage;

      // Calcula parametros de variação (Drift, Volatility, ChanceOfLoss)
      const drift = assetCalculateDrift(asset.profile);
      const volatility = assetCalculateVolatility(asset.profile);
      const typeMultiplier = assetCalculateTypeMultiplier(asset.type);
      const chanceOfLoss = assetCalculateChanceOfLoss(asset.profile, valuationFactor);

      // Determine a direção de variação do drift do ativo de acordo com a chance de perda
      const adjustedDrift = Math.random() < chanceOfLoss ? -Math.abs(drift) : drift;

      // Variação de preço
      const randomShock = (Math.random() * volatility - volatility * 0.5) * typeMultiplier;
      const randomVariation = adjustedDrift + randomShock;
      const newValue = asset.value.current * (1 + randomVariation);
      const adjustedValue =
        newValue < MINIMUM_PRICE ? MINIMUM_PRICE * (1 + Math.abs(randomVariation)) : newValue;
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
