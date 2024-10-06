import type { InvestmentAssets } from '@/@types/investment';
import { useFetch } from './useFetch';
import { fetchCurrencyByCode } from '@/services/currency';
import type { ConversionRates } from '@/@types/currency';
import { currencyExchangeRate, getCurrencyDisplayName } from '@/utils/currency';
import { useEffect, useState } from 'react';
import { Assets } from '@/lib/schemas/assets.schema';

export const useProccessInvestmentAssets = (investmentAssets: InvestmentAssets) => {
  const BRLConversionRates = useFetch<ConversionRates>(() => fetchCurrencyByCode('BRL')).data?.['brl'];
  const [processedAssets, setProcessedAssets] = useState<Assets[]>([]);

  useEffect(() => {
    const assetCodes = Object.keys(investmentAssets);

    const data = assetCodes.reduce<Assets[]>((processedAssets, assetCode) => {
      const assetPriceInBRL = currencyExchangeRate(assetCode, 'BRL', 1, BRLConversionRates);
      const assetData = investmentAssets[assetCode];

      const isPriceValid = !isNaN(assetPriceInBRL) && assetPriceInBRL >= 0.01;
      if (isPriceValid) {
        processedAssets.push({
          ...assetData,
          history: [],
          id: crypto.randomUUID(),
          value: { current: assetPriceInBRL, previous: 0 },
          name: getCurrencyDisplayName(assetCode, 'pt-BR') || assetData.name,
        });
      }

      return processedAssets;
    }, []);

    setProcessedAssets(data);
  }, [investmentAssets, BRLConversionRates]);

  return { processedAssets };
};
