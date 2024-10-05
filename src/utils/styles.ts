function generateAssetVariationColor(previous: number, current: number) {
  if (previous < current) return 'bg-green-700';
  if (previous > current) return 'bg-red-700';
  return 'bg-gray-500';
}

export { generateAssetVariationColor };
