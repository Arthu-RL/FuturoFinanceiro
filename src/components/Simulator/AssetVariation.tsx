import { generateRowDisplayData } from '@/utils/rows';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Row } from '@tanstack/react-table';
import { Assets } from '@/lib/schemas/assets.schema';

type AssetVariationProps = {
  row: Row<Assets>;
};

export const AssetVariation = ({ row }: AssetVariationProps) => {
  const { priceVariation, variationText, variationSign, variationBackgroundColor, VariationIcon } =
    generateRowDisplayData(row);

  return (
    <TooltipProvider>
      <Tooltip>
        <div className='flex w-full'>
          <TooltipTrigger className='ml-auto'>
            <Badge
              variant='default'
              className={`pointer-events-none flex items-center gap-1 px-1.5 font-normal text-white brightness-125 dark:font-bold dark:brightness-100 ${variationBackgroundColor}`}
            >
              {variationText}
              <VariationIcon className='size-[18px]' />
            </Badge>
          </TooltipTrigger>
        </div>
        <TooltipContent>
          <span>
            {variationSign}
            {priceVariation}%
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
