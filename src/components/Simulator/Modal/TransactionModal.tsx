import { Button } from '@/components/ui/button';
import { Assets } from '@/lib/schemas/assets.schema';
import { getProfitStatus, getProfitTextColor } from '@/utils/string';
import { Fragment } from 'react';
import { Table } from '@tanstack/react-table';
import { Minus, Plus } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { ModalHeading } from './ModalHeading';
import { useAssetModal } from '@/hooks/useAssetModal';
import { calculateTransactionProfitDetails } from '@/utils/number';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type TransactionModalProps = {
  table: Table<Assets>;
  columnId: string;
  transaction: 'purchase' | 'sale';
  textContent: { trigger: string; confirm: string };
  modalState: { currentState: boolean; setState: (value: boolean) => void };
};

export function TransactionModal({
  columnId,
  table,
  modalState,
  transaction,
  textContent,
}: TransactionModalProps) {
  const {
    row,
    assetCurrentPrice,
    userCurrentBalance,
    assetInWalletTotalInvestment,
    assetInWalletQuantity,
    assetToPurchaseQuantity,
    assetInWalletTransactionPrice,
    handleConfirmAction,
    handleUpdateQuantity,
  } = useAssetModal({ table, columnId, modalState });

  const isAssetBeingSold = transaction === 'sale';
  const isTotalPriceMoreThanUserBalance = assetToPurchaseQuantity * assetCurrentPrice > userCurrentBalance;

  const { assetProfit } = calculateTransactionProfitDetails(
    assetCurrentPrice,
    assetToPurchaseQuantity,
    assetInWalletTotalInvestment,
    assetInWalletQuantity,
  );

  return (
    <AlertDialog open={modalState.currentState}>
      <AlertDialogContent className='gap-2 max-sm:w-[90%]'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <ModalHeading row={row} />
          </AlertDialogTitle>
          <AlertDialogDescription>
            <ul className='my-2 flex flex-col gap-3'>
              <li className='flex w-full items-center justify-between'>
                <span className='text-lg font-medium text-foreground'>Quantidade</span>
                <div className='flex w-fit items-center gap-3 rounded-md bg-accent px-3 py-2'>
                  <Button
                    variant='ghost'
                    className='h-fit p-0'
                    onClick={() => handleUpdateQuantity(-1, transaction)}
                  >
                    <Minus
                      size={12}
                      className='cursor-pointer stroke-foreground transition-all hover:brightness-75'
                    />
                  </Button>
                  <span className='text-xs text-foreground'>{assetToPurchaseQuantity}</span>
                  <Button
                    variant='ghost'
                    className='h-fit p-0'
                    onClick={() => handleUpdateQuantity(1, transaction)}
                  >
                    <Plus
                      size={12}
                      className='cursor-pointer stroke-foreground transition-all hover:brightness-75'
                    />
                  </Button>
                </div>
              </li>
              <li className='flex flex-col gap-2'>
                {isAssetBeingSold ? (
                  <Fragment>
                    <div className='flex w-full justify-between'>
                      <span className='font-medium text-foreground'>Custo Total de Aquisição</span>
                      <span className={`font-medium text-foreground transition-all`}>
                        {formatCurrency(assetInWalletTotalInvestment, 'BRL', 'pt-BR')}
                      </span>
                    </div>
                    <div className='flex w-full justify-between'>
                      <span className='font-medium text-foreground'>Valor Total a Receber</span>
                      <span className={`font-medium text-foreground transition-all`}>
                        {formatCurrency(assetCurrentPrice * assetToPurchaseQuantity, 'BRL', 'pt-BR')}
                      </span>
                    </div>
                    <div className='flex w-full justify-between'>
                      <span className={`font-medium text-foreground ${getProfitTextColor(assetProfit)}`}>
                        Situação: {getProfitStatus(assetProfit)}
                      </span>
                      <span
                        className={`font-medium text-foreground transition-all ${getProfitTextColor(assetProfit)}`}
                      >
                        {formatCurrency(assetProfit, 'BRL', 'pt-BR')}
                      </span>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className='flex w-full justify-between'>
                      <span className='font-medium text-foreground'>Preço Total</span>
                      <span
                        className={`font-medium text-foreground transition-all ${isTotalPriceMoreThanUserBalance && 'text-red-600'}`}
                      >
                        {formatCurrency(assetCurrentPrice * assetToPurchaseQuantity, 'BRL', 'pt-BR')}
                      </span>
                    </div>
                    <div className='flex w-full justify-between'>
                      <span className='font-medium text-foreground'>Saldo Disponível</span>
                      <span className='font-medium text-foreground'>
                        {formatCurrency(userCurrentBalance, 'BRL', 'pt-BR')}
                      </span>
                    </div>
                  </Fragment>
                )}
                {assetInWalletQuantity > 0 && (
                  <Fragment>
                    <DropdownMenuSeparator />
                    {isAssetBeingSold && (
                      <div className='flex w-full justify-between'>
                        <span className='font-medium text-foreground'>Valor Pago por Ativo</span>
                        <span className='font-medium text-foreground'>
                          {formatCurrency(assetInWalletTransactionPrice, 'BRL', 'pt-BR')}
                        </span>
                      </div>
                    )}
                    <div className='flex w-full justify-between'>
                      <span className='font-medium text-foreground'>Quantidade em sua Carteira</span>
                      <span className='font-medium text-foreground'>{assetInWalletQuantity} Unidades</span>
                    </div>
                  </Fragment>
                )}
              </li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => modalState.setState(false)}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleConfirmAction(transaction)}
            disabled={isTotalPriceMoreThanUserBalance && transaction === 'purchase'}
          >
            {textContent.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
