import { Button } from '@/components/ui/button';
import { Assets } from '@/lib/schemas/assets.schema';
import { getProfitStatus, getProfitTextColor } from '@/utils/string';
import { Fragment } from 'react';
import { Table } from '@tanstack/react-table';
import { Minus, Plus } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';
import { ModalHeading } from './ModalHeading';
import { useAssetModal } from '@/hooks/useAssetModal';
import { calculateTransactionProfitDetails } from '@/utils/number';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import type { TransactionType } from '@/lib/schemas/user.schema';

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
  transaction: TransactionType;
  modalState: { currentState: boolean; setState: (value: boolean) => void };
  textContent: { trigger: string; confirm: string; title: string; description: string };
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
    handleConfirmAction,
    handleUpdateQuantity,
  } = useAssetModal({ table, columnId, modalState });

  const isAssetBeingSold = transaction === 'Sale';
  const isTotalPriceMoreThanUserBalance = assetToPurchaseQuantity * assetCurrentPrice > userCurrentBalance;

  const { assetProfit, costPerAsset } = calculateTransactionProfitDetails(
    assetCurrentPrice,
    assetToPurchaseQuantity,
    assetInWalletTotalInvestment,
    assetInWalletQuantity,
  );

  return (
    <AlertDialog open={modalState.currentState}>
      <AlertDialogContent
        className='gap-4 outline-none max-sm:w-[90%]'
        onEscapeKeyDown={() => modalState.setState(false)}
        onInteractOutside={() => modalState.setState(false)}
      >
        <AlertDialogHeader className='gap-2'>
          <AlertDialogTitle>
            <ModalHeading row={row} />
          </AlertDialogTitle>
          <AlertDialogDescription className='flex flex-col gap-4'>
            <Card>
              <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
                <div className='flex flex-1 flex-col justify-center gap-1 px-5 py-3'>
                  <CardTitle className='text-lg font-semibold'>{textContent.title}</CardTitle>
                  <CardDescription>{textContent.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className='px-4 py-2'>
                <ul className='mb-2 mt-0.5 flex flex-col gap-2.5'>
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
                  <li className='flex flex-col gap-2 pr-0.5'>
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
                  </li>
                </ul>
                {assetInWalletQuantity > 0 && (
                  <Fragment>
                    <DropdownMenuSeparator />
                    <ul className='mb-0.5 mt-2 flex h-fit flex-col gap-2 pr-0.5'>
                      {isAssetBeingSold && (
                        <li className='flex w-full justify-between'>
                          <span className='font-medium text-foreground'>Valor Pago por Ativo</span>
                          <span className='font-medium text-foreground'>
                            {formatCurrency(costPerAsset, 'BRL', 'pt-BR')}
                          </span>
                        </li>
                      )}
                      <li className='flex w-full justify-between'>
                        <span className='font-medium text-foreground'>Quantia na Carteira</span>
                        <span className='font-medium text-foreground'>{assetInWalletQuantity} Unidades</span>
                      </li>
                    </ul>
                  </Fragment>
                )}
              </CardContent>
            </Card>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => modalState.setState(false)}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleConfirmAction(transaction)}
            disabled={isTotalPriceMoreThanUserBalance && transaction === 'Purchase'}
          >
            {textContent.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
