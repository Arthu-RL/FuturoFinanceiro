import { env } from '@/env';

async function fetchAllCurrencies() {
  const currencyURL = new URL(`${env.VITE_CURRENCY_API_URL}/currencies.json`);
  return fetch(currencyURL);
}

async function fetchCurrencyByCode(currency: string) {
  const currencyURL = new URL(`${env.VITE_CURRENCY_API_URL}/currencies/${currency.toLowerCase()}.json`);
  return fetch(currencyURL);
}

export { fetchAllCurrencies, fetchCurrencyByCode };
