import { Badge } from '@/components/ui/badge';
import { Assets } from '@/lib/schemas/assets.schema';
import { formatCurrency } from '@/utils/currency';
import { translateAssetCategory } from '@/utils/string';
import { Row } from '@tanstack/react-table';
import { AssetVariation } from '../AssetsTable/AssetVariation';

type ModalHeadingProps = {
  row: Row<Assets>;
};

export const ModalHeading = ({ row }: ModalHeadingProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-wrap justify-between gap-4 px-0.5 max-[380px]:justify-center max-[380px]:gap-0'>
        <span className='whitespace-nowrap'>
          {row.original.name} ({row.original.alias})
        </span>
        <span className='whitespace-nowrap'>
          {formatCurrency(row.original.value.current, 'BRL', 'pt-BR')}
        </span>
      </div>
      <div className='flex'>
        <Badge className='w-fit'>{translateAssetCategory(row.original.type)}</Badge>
        <AssetVariation row={row} />
      </div>
    </div>
  );
};
