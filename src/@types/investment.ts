type Profile = `${RiskLevels}-risk`;
type RiskLevels = 'low' | 'medium' | 'high';
type AssetType = 'Fiat' | 'Crypto' | 'Commodity';
type InvestmentAssets = Record<string, { name: string; profile: Profile; alias: string; type: AssetType }>;

export type { InvestmentAssets, Profile, AssetType };
