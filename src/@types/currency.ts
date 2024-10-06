type CurrencyRates = { [currency: string]: Record<string, number> };
type ConversionRates = { date: string } & CurrencyRates;
type CurrencyDisplayNames = Record<string, string>;

export type { CurrencyRates, ConversionRates, CurrencyDisplayNames };
