import { useCallback, useEffect, useState } from 'react';
import { useProccessInvestmentAssets } from './useProccessInvestmentAssets';
import { useLocalStorage } from './useLocalStorage';
import { Assets, assetsSchemaArray } from '@/lib/schemas/assets.schema';
import { investmentAssets } from '@/data/investmentAssets';

export const useInvestmentAssets = () => {
  const { setStorageItem, getStorageItem } = useLocalStorage<Assets[]>(assetsSchemaArray);
  const [assets, setAssets] = useState<Assets[]>(getStorageItem('investmentAssets') || []);
  const { processedAssets } = useProccessInvestmentAssets(investmentAssets);

  const updateAssets = useCallback(
    (assets: Assets[]) => {
      setStorageItem('investmentAssets', assets);
      const investmentAssets = getStorageItem('investmentAssets');
      if (investmentAssets) setAssets(investmentAssets);
    },
    [getStorageItem, setStorageItem],
  );

  useEffect(() => {
    if (!getStorageItem('investmentAssets')?.length) updateAssets(processedAssets);
  }, [processedAssets, updateAssets, setStorageItem, getStorageItem]);

  return { assets, updateAssets };
};
