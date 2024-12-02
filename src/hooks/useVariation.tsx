import { useState } from "react"
import { AssetGlobalVariation, KeyVariation, VariationAssetsSettings } from "@/@types/investment";

// Valores padrões
export const baseDrift = { 'low-risk': 0.0001, 'medium-risk': 0.0006, 'high-risk': 0.001 };
export const baseVolatility = { 'low-risk': 0.0002, 'medium-risk': 0.0004, 'high-risk': 0.0008 };
export const baseChanceOfLoss = { 'low-risk': 0.03, 'medium-risk': 0.17, 'high-risk': 0.5 };

export function useVariation(): VariationAssetsSettings {
    const [ drift, setDrift ] = useState<AssetGlobalVariation>(baseDrift)
    const [ volatility, setVolatility ] = useState<AssetGlobalVariation>(baseVolatility)
    const [ loss, setLoss ] = useState<AssetGlobalVariation>(baseChanceOfLoss)
    
    function setVariationAsset(variationAssetValue: number, profileAssetKey: keyof AssetGlobalVariation, variationAssetKey: KeyVariation) {
      if (variationAssetKey === 'drift') {
        setDrift((prev) => ({...prev, [profileAssetKey]: variationAssetValue}))
      }
      else if (variationAssetKey === 'volatility') {
        setVolatility((prev) => ({...prev, [profileAssetKey]: variationAssetValue}))
      }
      else {
        setLoss((prev) => ({...prev, [profileAssetKey]: variationAssetValue}))
      }
    }

    return {
        drift,
        volatility,
        loss,
        setVariationAsset
    }
}