import { createContext, ReactNode, useContext } from 'react';
import { Assets } from '@/lib/schemas/assets.schema';

type InvestmentAssetsState = {
  assets: Assets[];
  updateAssets: (assets: Assets[]) => void;
};

const InvestmentAssetsContext = createContext<InvestmentAssetsState>({ assets: [], updateAssets: () => {} });

const InvestmentAssetsProvider = ({ children }: { children: ReactNode }) => {
  const { assets, updateAssets } = useInvestmentAssets();

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
