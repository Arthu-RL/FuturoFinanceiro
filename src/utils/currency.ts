import type { CurrencyRates } from '@/@types/currency';
import { Locale } from '@/@types/locale';

function currencyExchangeRate(
  fromCurrency: string,
  toCurrency: string,
  amount: number,
  rates?: CurrencyRates[string],
) {
  const conversionRates = rates ?? {};
  const fromRate = conversionRates[fromCurrency.toLowerCase()];
  const toRate = conversionRates[toCurrency.toLowerCase()];
  const amountInBaseCurrency = amount / fromRate;
  return amountInBaseCurrency * toRate;
}

function getCurrencyDisplayName(currencyCode: string, locale: Locale) {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: 'currency', fallback: 'none' });
    return displayNames.of(currencyCode.toUpperCase());
  } catch (_) {
    return null;
  }
}

function formatCurrency(amount: number, currency: string, locale: Locale) {
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: currency });
  return formatter.format(amount);
}

export { formatCurrency, currencyExchangeRate, getCurrencyDisplayName };
