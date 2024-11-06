import { Locale } from '@/@types/locale';
import { Assets } from '@/lib/schemas/assets.schema';
import { User } from '@/lib/schemas/user.schema';

function getAssetVariation(previousValue: number, currentValue: number) {
  if (previousValue === 0) return currentValue;
  return ((currentValue - previousValue) / previousValue) * 100;
}

function formatNumberWithSign(number: number) {
  return `${(number > 0 && '+') || ''}${number.toFixed(2)}`;
}

function formatNumberWithoutFractionDigits(amount: number, locale: Locale) {
  const formatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  return formatter.format(amount);
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

function roundIfTooSmall(value: number, threshold: number = 1e-10) {
  return Math.abs(value) < threshold ? 0 : value;
}

function calculateTransactionProfitDetails(
  currentPrice: number,
  transactionQuantity: number,
  totalInvestment: number,
  totalWalletQuantity: number,
) {
  const transactionValue = currentPrice * transactionQuantity;
  const costPerAsset = totalInvestment / totalWalletQuantity;
  const proportionateInvestment = costPerAsset * transactionQuantity;
  const assetProfit = roundIfTooSmall(transactionValue - proportionateInvestment);
  return { assetProfit, costPerAsset, proportionateInvestment, transactionValue };
}

function calculateWeekTotalProfit(currentWeekProfitability: User['profitabilityHistory']) {
  return currentWeekProfitability.reduce((weekProfitability, { profitability }) => {
    return weekProfitability + profitability;
  }, 0);
}

export {
  getAssetVariation,
  formatNumberWithSign,
  calculateTotalHoldingsValue,
  calculateTransactionProfitDetails,
  roundIfTooSmall,
  calculateWeekTotalProfit,
  formatNumberWithoutFractionDigits,
};
