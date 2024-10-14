import { Assets } from '@/lib/schemas/assets.schema';
import { User } from '@/lib/schemas/user.schema';

function getAssetVariation(previousValue: number, currentValue: number) {
  if (previousValue === 0) return ((currentValue - 1) / 1) * 100;
  return ((currentValue - previousValue) / previousValue) * 100;
}

function formatNumberWithSign(number: number) {
  return `${(number > 0 && '+') || ''}${number.toFixed(2)}`;
}

function calculateTotalHoldingsValue(
  total: number,
  assets: Assets[],
  { id, quantity }: User['currentWallet'][number],
) {
  const asset = assets.find((asset) => asset.id === id);
  if (asset) total += quantity * asset?.value.current;
  return total;
}

export { getAssetVariation, formatNumberWithSign, calculateTotalHoldingsValue };
