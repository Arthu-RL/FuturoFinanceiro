import { Assets } from '@/lib/schemas/assets.schema';
import { Table } from '@tanstack/react-table';
import { ModalHeading } from './ModalHeading';
import { useAssetModal } from '@/hooks/useAssetModal';
import { calculateAssetTrend, calculateHighsAndLows, calculateVolatility } from '@/utils/asset';
import { Chart } from './Chart';
import { formatCurrency } from '@/utils/currency';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { X } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type TransactionModalProps = {
  table: Table<Assets>;
  columnId: string;
  modalState: { currentState: boolean; setState: (value: boolean) => void };
};

export function DetailsModal({ columnId, table, modalState }: TransactionModalProps) {
  const { row, assetCurrentPrice, assetHistory } = useAssetModal({ table, columnId, modalState });
  const { lowestValue, highestValue } = calculateHighsAndLows(assetHistory);
  const assetVolatility = calculateVolatility(assetHistory);
  const assetTrend = calculateAssetTrend(assetHistory);

  return (
    <AlertDialog open={modalState.currentState} onOpenChange={modalState.setState}>
      <AlertDialogContent className='gap-4 px-5 pt-8 max-sm:w-[90%]'>
        <AlertDialogAction className='absolute right-2 top-2 h-fit w-fit bg-transparent p-0 hover:bg-transparent'>
          <X size={18} className='stroke-foreground' />
        </AlertDialogAction>
        <AlertDialogHeader className='relative mt-1 gap-2'>
          <AlertDialogTitle className='px-1'>
            <ModalHeading row={row} />
          </AlertDialogTitle>
          <AlertDialogDescription className='flex flex-col gap-4'>
            <Chart assetHistory={assetHistory} />
            <ul className='flex flex-col gap-2 px-1'>
              <li className='flex w-full justify-between'>
                <span className='font-medium text-foreground'>Maior Preço Registrado</span>
                <span className='font-medium text-foreground transition-all'>
                  {formatCurrency(highestValue || assetCurrentPrice, 'BRL', 'pt-BR')}
                </span>
              </li>
              <li className='flex w-full justify-between'>
                <span className='font-medium text-foreground'>Menor Preço Registrado</span>
                <span className='font-medium text-foreground transition-all'>
                  {formatCurrency(lowestValue || assetCurrentPrice, 'BRL', 'pt-BR')}
                </span>
              </li>
              <DropdownMenuSeparator />
              <li className='flex w-full justify-between'>
                <span className='font-medium text-foreground'>Tendência do Ativo</span>
                <span className={`font-medium brightness-150 transition-all ${assetTrend.color}`}>
                  {assetTrend.text}
                </span>
              </li>
              <li className='flex w-full justify-between'>
                <span className='font-medium text-foreground'>Volatilidade do Ativo</span>
                <span className={`font-medium transition-all ${assetVolatility.color}`}>
                  {assetVolatility.text}
                </span>
              </li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
