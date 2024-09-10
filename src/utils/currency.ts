import type { CurrencyRates } from '@/@types/currency';

type Locale = 'pt-BR' | 'en-US';

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

function getCurrencyDisplayName(currency: string, locale: Locale) {
  const displayNames = new Intl.DisplayNames([locale], { type: 'currency' });
  return displayNames.of(currency.toUpperCase());
}

function formatCurrency(amount: number, currency: string, locale: Locale) {
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: currency });
  return formatter.format(amount);
}

export { formatCurrency, currencyExchangeRate, getCurrencyDisplayName };
