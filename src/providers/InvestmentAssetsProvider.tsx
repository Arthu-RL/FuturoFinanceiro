import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Assets, assetsSchemaArray } from '@/lib/schemas/assets.schema';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { investmentAssets } from '@/data/investmentAssets';
import { useProccessInvestmentAssets } from '@/hooks/useProccessInvestmentAssets';

type InvestmentAssetsState = {
  assets: Assets[];
  updateAssets: (assets: Assets[]) => void;
};

const InvestmentAssetsContext = createContext<InvestmentAssetsState>({ assets: [], updateAssets: () => {} });

const InvestmentAssetsProvider = ({ children }: { children: ReactNode }) => {
  const { setStorageItem, getStorageItem } = useLocalStorage<Assets[]>(assetsSchemaArray);
  const [assets, setAssets] = useState<Assets[]>(getStorageItem('investmentAssets') || []);
  const { processedAssets } = useProccessInvestmentAssets(investmentAssets);

  const updateAssets = (assets: Assets[]) => {
    setStorageItem('investmentAssets', assets);
    const investmentAssets = getStorageItem('investmentAssets');
    if (investmentAssets) setAssets(investmentAssets);
  };

  useEffect(() => {
    if (!getStorageItem('investmentAssets')?.length) setStorageItem('investmentAssets', processedAssets);
  }, [processedAssets, setStorageItem, getStorageItem]);

  return (
    <InvestmentAssetsContext.Provider value={{ assets, updateAssets }}>
      {children}
    </InvestmentAssetsContext.Provider>
  );
};

const useInvestmentAssets = () => {
  const context = useContext(InvestmentAssetsContext);
  if (!context) throw new Error('useInvestmentAssets must be used within a InvestmentAssetsProvider');
  return context;
};

export { InvestmentAssetsProvider, useInvestmentAssets };
