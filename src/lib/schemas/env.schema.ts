import { z } from 'zod';

export const envSchema = z.object({
  MODE: z.enum(['staging', 'development', 'production']),
  BASE_URL: z.string(),
  PROD: z.boolean(),
  DEV: z.boolean(),
  SSR: z.boolean(),
  VITE_CURRENCY_API_URL: z.string().url(),
});
