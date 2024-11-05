import { z } from 'zod';

const transactionType = ['Purchase', 'Sale'] as const;
const achievementsNames = [
  'Primeira Aquisição',
  'Primeiro Lucro',
  'Vendedor Experiente',
  'Diversificador de Portfólio',
  'Investidor Conservador',
  'Explorador de Cripto',
  'Comerciante de Commodities',
  'Caçador de Riscos',
  'Milionário do Dia',
  'Mestre dos Investimentos',
  'Primeiro Milhão',
  'Grande Lucro',
  'Colecionador de Ativos',
  'Gênio da Semana',
  'Trader Ativo',
] as const;

const achievementsSchema = z.object({
  description: z.string(),
  isCompleted: z.boolean(),
  name: z.enum(achievementsNames),
});

const purchasedAssetSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number(),
  totalInvestment: z.number(),
  type: z.enum(transactionType),
  purchasePrice: z.number(),
  sellingPrice: z.number(),
});

const userSchema = z.object({
  currentBalance: z.number(),
  currentProfitability: z.number(),
  achievements: z.array(achievementsSchema),
  currentWallet: z.array(purchasedAssetSchema),
  transactionHistory: z.array(purchasedAssetSchema),
  balanceHistory: z.array(z.object({ date: z.coerce.date(), balance: z.number() })),
  profitabilityHistory: z.array(z.object({ date: z.coerce.date(), profitability: z.number() })),
  walletHistory: z.array(z.object({ date: z.coerce.date(), wallet: z.array(purchasedAssetSchema) })),
});

type User = z.infer<typeof userSchema>;
type Achievement = (typeof achievementsNames)[number];
type TransactionType = (typeof transactionType)[number];
type PurchasedAsset = z.infer<typeof purchasedAssetSchema>;

export type { User, Achievement, PurchasedAsset, TransactionType };
export { userSchema, purchasedAssetSchema };
