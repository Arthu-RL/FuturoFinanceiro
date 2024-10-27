import { Assets } from '@/lib/schemas/assets.schema';

function getAssetVariationStatus(previous: number, current: number) {
  if (previous < current) return 'increase';
  if (previous > current) return 'decrease';
  return 'stable';
}

// Calcula movimentação do ativo
function assetCalculateDrift(profile: 'low-risk' | 'medium-risk' | 'high-risk') {
  const baseDrift = { 'low-risk': 0.005, 'medium-risk': 0.05, 'high-risk': 0.08 };

  return baseDrift[profile] || 0.01;
}

// Variação de preço baseado no perfil
function assetCalculateVolatility(profile: 'low-risk' | 'medium-risk' | 'high-risk') {
  const baseVolatility = { 'low-risk': 0.02, 'medium-risk': 0.05, 'high-risk': 0.08 };
  let volatility = baseVolatility[profile] || 0.05;

  if (profile === 'high-risk') {
    if (Math.random() < 0.1) {
      volatility *= 2;
    }
  }

  return volatility;
}

// Variação por tipo de produto
function assetCalculateTypeMultiplier(type: 'Crypto' | 'Commodity' | 'Fiat') {
  let typeMultiplier = 1;

  if (type === 'Crypto' && Math.random() < 0.2) {
    typeMultiplier = 1.2;
  } else if (type === 'Commodity' && Math.random() < 0.15) {
    typeMultiplier = 1.1;
  } else if (type === 'Fiat') {
    typeMultiplier = 0.8;
  }

  return typeMultiplier;
}

// Calculo chancede perda
function assetCalculateChanceOfLoss(
  profile: 'low-risk' | 'medium-risk' | 'high-risk',
  valuationFactor: number,
) {
  const baseChanceOfLoss = { 'low-risk': 0.075, 'medium-risk': 0.15, 'high-risk': 0.5 };
  let chanceOfLoss = baseChanceOfLoss[profile] || 0.2;

  if (valuationFactor > 1.1) {
    chanceOfLoss *= 1.5;
  } else if (valuationFactor > 1.2 && (profile === 'medium-risk' || profile === 'high-risk')) {
    chanceOfLoss *= 3;
  } else if (valuationFactor > 1.5 && (profile === 'medium-risk' || profile === 'high-risk')) {
    chanceOfLoss *= 6;
  }

  return chanceOfLoss;
}

function calculateAssetTrend(assetHistory: Assets['history']) {
  const TENDENCY_THRESHOLD = 0.005;
  const stableAsset = { text: 'Estável', color: 'text-blue-500' };
  if (assetHistory.length < 2) return stableAsset;

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
    return stableAsset;
  }
}

function calculateVolatility(assetHistory: Assets['history']) {
  const HIGH_VOLATILITY_THRESHOLD = 0.05;
  const LOW_VOLATILITY_THRESHOLD = 0.02;

  const mean = assetHistory.reduce((sum, { value }) => sum + value, 0) / assetHistory.length;
  const squaredDiffs = assetHistory.map(({ value }) => ((value - mean) / mean) ** 2);
  const averageSquaredDiff = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / squaredDiffs.length;
  const standardDeviation = Math.sqrt(averageSquaredDiff);

  if (standardDeviation < LOW_VOLATILITY_THRESHOLD) {
    return { text: 'Baixa Volatilidade', color: 'text-green-600' };
  } else if (standardDeviation >= LOW_VOLATILITY_THRESHOLD && standardDeviation < HIGH_VOLATILITY_THRESHOLD) {
    return { text: 'Média Volatilidade', color: 'text-orange-500' };
  } else {
    return { text: 'Alta Volatilidade', color: 'text-red-600' };
  }
}

function calculateHighsAndLows(assetHistory: Assets['history']) {
  if (!assetHistory.length) return { highestValue: null, lowestValue: null };
  const highestValue = Math.max(...assetHistory.map(({ value }) => value));
  const lowestValue = Math.min(...assetHistory.map(({ value }) => value));
  return { highestValue, lowestValue };
}

export {
  getAssetVariationStatus,
  assetCalculateDrift,
  assetCalculateVolatility,
  assetCalculateTypeMultiplier,
  assetCalculateChanceOfLoss,
  calculateAssetTrend,
  calculateVolatility,
  calculateHighsAndLows,
};
