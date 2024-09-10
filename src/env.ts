import { envSchema } from './lib/schemas/env.schema';

export const env = envSchema.parse({
  MODE: import.meta.env.MODE,
  BASE_URL: import.meta.env.BASE_URL,
  PROD: import.meta.env.PROD,
  DEV: import.meta.env.DEV,
  SSR: import.meta.env.SSR,
  VITE_CURRENCY_API_URL: import.meta.env.VITE_CURRENCY_API_URL,
});
