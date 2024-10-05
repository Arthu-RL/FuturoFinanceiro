import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AssetsContext } from './providers';
import { Assets, assetsSchemaArray } from '@/lib/schemas/assets.schema';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useInvestmentAssets } from '@/hooks/useInvestmentAssets';
import { investmentAssets } from '@/data/investmentAssets';

export const InvestmentAssetsProvider = ({ children }: { children: ReactNode }) => {
  const { setStorageItem, getStorageItem } = useLocalStorage<Assets[]>(assetsSchemaArray);
  const { processedAssets } = useInvestmentAssets(investmentAssets);

  const [assets, setAssets] = useState<Assets[]>(getStorageItem('investmentAssets') || []);

  const updateAssets = useCallback(
    (assets: Assets[]) => {
      setAssets(setStorageItem('investmentAssets', assets) || []);
    },
    [setStorageItem],
  );

  useEffect(() => {
    if (assets.length) return;
    updateAssets(processedAssets);
  }, [assets, processedAssets, updateAssets]);

  return <AssetsContext.Provider value={{ assets, updateAssets }}>{children}</AssetsContext.Provider>;
};
