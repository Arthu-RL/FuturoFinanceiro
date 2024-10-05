import { Assets } from '@/lib/schemas/assets.schema';

type Profile = `${RiskLevels}-risk`;
type RiskLevels = 'low' | 'medium' | 'high';
type AssetType = 'Fiat' | 'Crypto' | 'Commodity';
type InvestmentAssets = Record<string, { name: string; profile: Profile; alias: string; type: AssetType }>;

type InvestmentAssetsState = {
  assets: Assets[];
  updateAssets: (assets: Assets[]) => void;
};

export type { InvestmentAssets, InvestmentAssetsState, Profile, AssetType };
