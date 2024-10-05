import { AssetsContext } from '@/providers/providers';
import { useContext } from 'react';

export const useAssets = () => {
  const context = useContext(AssetsContext);
  if (!context) throw new Error('useAssets must be used within a ThemeProvider');
  return context;
};
