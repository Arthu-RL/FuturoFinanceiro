function getAssetVariation(previousValue: number, currentValue: number) {
  return ((currentValue - previousValue) / previousValue) * 100;
}

export { getAssetVariation };
