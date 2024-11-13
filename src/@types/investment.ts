type Profile = `${RiskLevels}-risk`;
type RiskLevels = 'low' | 'medium' | 'high';
type AssetType = 'Fiat' | 'Crypto' | 'Commodity';
type InvestmentAssets = Record<string, { name: string; profile: Profile; alias: string; type: AssetType }>;
type AssetGlobalVariation = Record<Profile, number>;
type KeyVariation = 'drift' | 'volatility' | 'loss';

type VariationAssetsSettings = {
    drift: AssetGlobalVariation;
    volatility: AssetGlobalVariation;
    loss: AssetGlobalVariation;
    setVariationAsset: (
            variationAssetValue: number, 
            profileAssetKey: keyof AssetGlobalVariation, 
            variationAssetKey: KeyVariation
    ) => void
}

export type { InvestmentAssets, Profile, AssetType, AssetGlobalVariation, KeyVariation, VariationAssetsSettings };