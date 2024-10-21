import { z } from 'zod';

const investmentProfiles = ['low-risk', 'medium-risk', 'high-risk'] as const;
const assetTypes = ['Fiat', 'Crypto', 'Commodity'] as const;

const assetsSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  alias: z.string(),
  type: z.enum(assetTypes),
  profile: z.enum(investmentProfiles),
  value: z.object({ current: z.number(), previous: z.number() }),
  history: z.array(z.object({ value: z.number(), timestamp: z.coerce.date() })),
});

const assetsSchemaArray = z.array(assetsSchema);

type Assets = z.infer<typeof assetsSchema>;

export type { Assets };
export { assetsSchema, assetsSchemaArray };
