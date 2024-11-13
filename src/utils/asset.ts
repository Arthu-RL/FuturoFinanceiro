import { Assets } from '@/lib/schemas/assets.schema';
import { Profile, AssetType, AssetGlobalVariation } from '@/@types/investment';


const TENDENCY_THRESHOLD = 0.005;
const HIGH_VOLATILITY_THRESHOLD = 6.5;
const MEDIUM_VOLATILITY_THRESHOLD = 2.5;

function getAssetVariationStatus(previous: number, current: number) {
  if (previous < current) return 'increase';
  if (previous > current) return 'decrease';
  return 'stable';
}

// Drift calculation based on profile
function assetCalculateDrift(profile: Profile, baseDrift: AssetGlobalVariation) {
  return baseDrift[profile] || 0.01;
}

// Volatility calculation based on profile, with higher spikes for high-risk
function assetCalculateVolatility(profile: Profile, baseVolatility: AssetGlobalVariation) {
  let volatility = baseVolatility[profile] || 0.05;

  if (profile === 'high-risk' && Math.random() < 0.1) {
    volatility *= 2;
  }

  return volatility;
}

// Type-based multiplier
function assetCalculateTypeMultiplier(assetType: AssetType) {
  if (assetType === 'Crypto' && Math.random() < 0.2) return 0.2;
  if (assetType === 'Commodity' && Math.random() < 0.15) return 0.1;
  if (assetType === 'Fiat') return 0.15;
  return 0.5;
}

// Calculo chancede perda
function assetCalculateChanceOfLoss(profile: Profile, baseChanceOfLoss: AssetGlobalVariation, valuationFactor?: number) {
  let chanceOfLoss = baseChanceOfLoss[profile];

  if (!valuationFactor) return chanceOfLoss;

  if (valuationFactor > 1.1) {
    chanceOfLoss *= 1.2;
  }
  if (valuationFactor > 1.2 && ['medium-risk', 'high-risk'].includes(profile)) {
    chanceOfLoss *= 1.6;
  }
  if (valuationFactor > 1.5 && ['medium-risk', 'high-risk'].includes(profile)) {
    chanceOfLoss *= 2;
  }

  return chanceOfLoss;
}

// Asset trend calculation based on recent history
function calculateAssetTrend(assetHistory: Assets['history']) {
  if (assetHistory.length < 2) return { text: 'Indisponível', color: 'text-gray-500' };

  const totalChange = assetHistory.slice(1).reduce((total, _, index) => {
    const change = (assetHistory[index + 1].value - assetHistory[index].value) / assetHistory[index].value;
    total += change;
    return total;
  }, 0);

  const averageChange = totalChange / (assetHistory.length - 1);

  if (averageChange > TENDENCY_THRESHOLD) {
    return { text: 'Tendência de Alta', color: 'text-green-500' };
  } else if (averageChange < -TENDENCY_THRESHOLD) {
    return { text: 'Tendência de Baixa', color: 'text-red-500' };
  } else {
    return { text: 'Estável', color: 'text-blue-500' };
  }
}

// Volatility calculation based on standard deviation
function calculateVolatility(assetHistory: Assets['history']) {
  if (assetHistory.length < 2) return { text: 'Indisponível', color: 'text-gray-300' };

  const logReturns = assetHistory.slice(1).map((asset, index) => {
    const previousValue = assetHistory[index].value;
    const currentValue = asset.value;
    return Math.log(currentValue / previousValue);
  });

  const meanLogReturn = logReturns.reduce((acc, val) => acc + val, 0) / logReturns.length;
  const sumSquaredDifferences = logReturns.reduce((acc, val) => acc + Math.pow(val - meanLogReturn, 2), 0);
  const variance = sumSquaredDifferences / (logReturns.length - 1);
  const volatilityPercentage = Math.sqrt(variance) * 100;

  if (volatilityPercentage >= HIGH_VOLATILITY_THRESHOLD) {
    return { text: 'Alta Volatilidade', color: 'text-red-600' };
  } else if (volatilityPercentage >= MEDIUM_VOLATILITY_THRESHOLD) {
    return { text: 'Média Volatilidade', color: 'text-orange-500' };
  } else {
    return { text: 'Baixa Volatilidade', color: 'text-green-600' };
  }
}

// Historical highs and lows
function calculateHighsAndLows(assetHistory: Assets['history']) {
  if (!assetHistory.length) return { highestValue: null, lowestValue: null };
  const highestValue = Math.max(...assetHistory.map(({ value }) => value));
  const lowestValue = Math.min(...assetHistory.map(({ value }) => value));
  return { highestValue, lowestValue };
}

function getAssetValue<T extends Assets, K extends keyof T>(assetId: string, assets: T[], key: K) {
  return assets.find(({ id }) => id === assetId)?.[key] ?? null;
}

export {
  getAssetValue,
  getAssetVariationStatus,
  assetCalculateDrift,
  assetCalculateVolatility,
  assetCalculateTypeMultiplier,
  calculateAssetTrend,
  calculateVolatility,
  calculateHighsAndLows,
  assetCalculateChanceOfLoss,
};
