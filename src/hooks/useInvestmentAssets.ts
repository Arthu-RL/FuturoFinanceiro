import type { InvestmentAssets, ProcessedInvestmentAssets } from '@/@types/investmentAssets';
import { useFetch } from './useFetch';
import { fetchCurrencyByCode } from '@/services/currency';
import type { ConversionRates } from '@/@types/currency';
import { currencyExchangeRate } from '@/utils/currency';
import { useEffect, useState } from 'react';

export const useInvestmentAssets = (investmentAssets: InvestmentAssets) => {
  const BRLConversionRates = useFetch<ConversionRates>(() => fetchCurrencyByCode('BRL')).data?.['brl'];
  const [processedAssets, setProcessedAssets] = useState<ProcessedInvestmentAssets[]>([]);

  useEffect(() => {
    const assetCodes = Object.keys(investmentAssets);

    const data = assetCodes.reduce<ProcessedInvestmentAssets[]>((processedAssets, assetCode) => {
      const assetPriceInBRL = currencyExchangeRate(assetCode.toUpperCase(), 'BRL', 1, BRLConversionRates);
      const assetData = investmentAssets[assetCode];

      const isPriceValid = !isNaN(assetPriceInBRL) && assetPriceInBRL >= 0.01;
      if (isPriceValid) processedAssets.push({ ...assetData, price: assetPriceInBRL });

      return processedAssets;
    }, []);

    setProcessedAssets(data);
  }, [investmentAssets, BRLConversionRates]);

  return { processedAssets };
};
