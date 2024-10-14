function getAssetVariationStatus(previous: number, current: number) {
  if (previous < current) return 'increase';
  if (previous > current) return 'decrease';
  return 'stable';
}

// Calcula movimentação do ativo
function assetCalculateDrift(profile: "low-risk" | "medium-risk" | "high-risk") {
  const baseDrift = { "low-risk": 0.005, "medium-risk": 0.05, "high-risk": 0.08 };
  
  return baseDrift[profile] || 0.01;
};

// Variação de preço baseado no perfil
function assetCalculateVolatility(profile: "low-risk" | "medium-risk" | "high-risk") {
  const baseVolatility = { "low-risk": 0.02, "medium-risk": 0.05, "high-risk": 0.08 };
  let volatility = baseVolatility[profile] || 0.05;

  if (profile === "high-risk") {
    if (Math.random() < 0.1) {
      volatility *= 2;
    }
  }

  return volatility;
};

// Variação por tipo de produto
function assetCalculateTypeMultiplier(type: "Crypto" | "Commodity" | "Fiat") {
  let typeMultiplier = 1;

  if (type === "Crypto" && Math.random() < 0.2) {
    typeMultiplier = 1.2;
  } else if (type === "Commodity" && Math.random() < 0.15) {
    typeMultiplier = 1.1;
  } else if (type === "Fiat") {
    typeMultiplier = 0.8;
  }

  return typeMultiplier;
};

// Calculo chancede perda
function assetCalculateChanceOfLoss(profile: "low-risk" | "medium-risk" | "high-risk", valuationFactor: number) {
  const baseChanceOfLoss = { "low-risk": 0.075, "medium-risk": 0.15, "high-risk": 0.5 };
  let chanceOfLoss = baseChanceOfLoss[profile] || 0.2;

  if (valuationFactor > 1.1) {
    chanceOfLoss *= 1.5;
  } else if (valuationFactor > 1.2 && (profile === "medium-risk" || profile === "high-risk")) {
    chanceOfLoss *= 3;
  }
  else if (valuationFactor > 1.5 && (profile === "medium-risk" || profile === "high-risk")) {
    chanceOfLoss *= 6;
  }

  return chanceOfLoss;
};

export { getAssetVariationStatus, assetCalculateDrift, assetCalculateVolatility, assetCalculateTypeMultiplier, assetCalculateChanceOfLoss };
