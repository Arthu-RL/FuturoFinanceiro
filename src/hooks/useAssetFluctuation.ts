import { Assets } from '@/lib/schemas/assets.schema';

import {
  assetCalculateDrift,
  assetCalculateVolatility,
  assetCalculateTypeMultiplier,
  assetCalculateChanceOfLoss,
} from '@/utils/asset';

const MINIMUM_PRICE = 0.01;

export const useAssetFluctuation = (assets: Assets[]) => {
  const computedAssets = assets.map((asset) => {
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

  return { computedAssets };
};
