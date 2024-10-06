function getVariationStatus(previous: number, current: number) {
  if (previous < current) return 'increase';
  if (previous > current) return 'decrease';
  return 'stable';
}

export { getVariationStatus };
