import { Assets } from '@/lib/schemas/assets.schema';
import { Row } from '@tanstack/react-table';
import { getAssetVariation } from './number';
import { getAssetVariationStatus } from './asset';
import { CircleArrowDown, CircleArrowUp, CircleDot } from 'lucide-react';

function sortRowsByVariation(rowA: Row<Assets>, rowB: Row<Assets>) {
  const rowAValues = Object(rowA.getValue('value'));
  const rowBValues = Object(rowB.getValue('value'));
  const currentPriceA = 'current' in rowAValues ? rowAValues.current : 0;
  const previousPriceA = 'previous' in rowAValues ? rowAValues.previous : 0;
  const currentPriceB = 'current' in rowBValues ? rowBValues.current : 0;
  const previousPriceB = 'previous' in rowBValues ? rowBValues.previous : 0;

  const variationA = getAssetVariation(previousPriceA, currentPriceA);
  const variationB = getAssetVariation(previousPriceB, currentPriceB);

  return variationA < variationB ? 1 : variationA > variationB ? -1 : 0;
}

function sortRowsByValue(rowA: Row<Assets>, rowB: Row<Assets>) {
  const rowAValues = Object(rowA.getValue('value'));
  const rowBValues = Object(rowB.getValue('value'));
  const valueA = 'current' in rowAValues ? rowAValues.current : 0;
  const valueB = 'current' in rowBValues ? rowBValues.current : 0;
  return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
}

function generateRowDisplayData(row: Row<Assets>) {
  const assetValues = Object(row.getValue('value'));
  const currentPrice = assetValues.current || 0;
  const previousPrice = assetValues.previous || 0;

  const priceVariation = getAssetVariation(previousPrice, currentPrice);
  const variationStatus = getAssetVariationStatus(previousPrice, currentPrice);
  const variationSign = priceVariation > 0 ? '+' : '';
  const variationText = `${variationSign}${priceVariation.toFixed(2)}%`;

  const variationBackgroundColor =
    variationStatus === 'increase'
      ? 'bg-green-700'
      : variationStatus === 'decrease'
        ? 'bg-red-700'
        : 'bg-gray-500';

  const VariationIcon =
    variationStatus === 'increase'
      ? CircleArrowUp
      : variationStatus === 'decrease'
        ? CircleArrowDown
        : CircleDot;

  return { priceVariation, variationSign, variationText, variationBackgroundColor, VariationIcon };
}

export { sortRowsByVariation, sortRowsByValue, generateRowDisplayData };
