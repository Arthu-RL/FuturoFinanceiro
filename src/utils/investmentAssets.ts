function getInvestmentAssetsVariation(previousValue: number, currentValue: number) {
  return ((currentValue - previousValue) / previousValue) * 100;
}

export { getInvestmentAssetsVariation };
