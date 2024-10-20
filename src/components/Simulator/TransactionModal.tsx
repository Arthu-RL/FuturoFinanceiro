import { Button } from '@/components/ui/button';
import { Assets } from '@/lib/schemas/assets.schema';
import { Badge } from '@/components/ui/badge';
import { getProfitStatus, getProfitTextColor, translateAssetCategory } from '@/utils/string';
import { Fragment, useEffect, useState } from 'react';
import { Table } from '@tanstack/react-table';
import { Minus, Plus } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';
import { useUserAccount } from '@/providers/userAccountProvider';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { AssetVariation } from './AssetsTable/AssetVariation';
import { useTransaction } from '@/hooks/useTransaction';
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
  const { buyAsset, sellAsset } = useTransaction();
  const { user } = useUserAccount();

  const [quantity, setQuantity] = useState(1);
  const row = table.getRow(columnId);
  const assetInWallet = user.currentWallet.find(({ id }) => id === row.original.id);
  const assetQuantityInWallet = assetInWallet?.quantity ?? 0;
  const isTotalPriceMoreThanUserBalance = quantity * row.original.value.current > user.currentBalance;
  const asset = user.currentWallet.find(({ id }) => id === row.original.id);
  const currentPrice = row.original.value.current;
  const totalInvestment = assetInWallet?.totalInvestment ?? 0;
  const totalWalletQuantity = assetInWallet?.quantity ?? 0;
  const isAssetBeingSold = transaction === 'sale';

  const { assetProfit } = calculateTransactionProfitDetails(
    currentPrice,
    quantity,
    totalInvestment,
    totalWalletQuantity,
  );

  function handleUpdateQuantity(action: number) {
    setQuantity((current) => {
      const sum = current + action;
      if (transaction === 'sale') return sum <= Number(asset?.quantity) && sum > 0 ? sum : current;
      return sum > 0 ? (current += action) : 1;
    });
  }

  function handleConfirmAction() {
    if (transaction === 'purchase') {
      buyAsset(row.original.id, quantity, row.original.value.current);
    }

    if (transaction === 'sale' && asset) {
      sellAsset(row.original.id, quantity, row.original.value.current);
    }

    modalState.setState(false);
  }

  useEffect(() => setQuantity(1), [modalState.currentState]);

  return (
    <AlertDialog open={modalState.currentState}>
      <AlertDialogContent className='gap-2 max-sm:w-[90%]'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between px-0.5'>
                <span>
                  {row.original.name} ({row.original.alias})
                </span>
                <span>{formatCurrency(row.original.value.current, 'BRL', 'pt-BR')}</span>
              </div>
              <div className='flex'>
                <Badge className='w-fit'>{translateAssetCategory(row.original.type)}</Badge>
                <AssetVariation row={row} />
              </div>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <ul className='my-2 flex flex-col gap-3'>
              <li className='flex w-full items-center justify-between'>
                <span className='text-lg font-medium text-foreground'>Quantidade</span>
                <div className='flex w-fit items-center gap-3 rounded-md bg-accent px-3 py-2'>
                  <Button variant='ghost' className='h-fit p-0' onClick={() => handleUpdateQuantity(-1)}>
                    <Minus
                      size={12}
                      className='cursor-pointer stroke-foreground transition-all hover:brightness-75'
                    />
                  </Button>
                  <span className='text-xs text-foreground'>{quantity}</span>
                  <Button variant='ghost' className='h-fit p-0' onClick={() => handleUpdateQuantity(1)}>
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
                        {formatCurrency(Number(asset?.totalInvestment), 'BRL', 'pt-BR')}
                      </span>
                    </div>
                    <div className='flex w-full justify-between'>
                      <span className='font-medium text-foreground'>Valor Total a Receber</span>
                      <span className={`font-medium text-foreground transition-all`}>
                        {formatCurrency(row.original.value.current * quantity, 'BRL', 'pt-BR')}
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
                        {formatCurrency(row.original.value.current * quantity, 'BRL', 'pt-BR')}
                      </span>
                    </div>
                    <div className='flex w-full justify-between'>
                      <span className='font-medium text-foreground'>Saldo Disponível</span>
                      <span className='font-medium text-foreground'>
                        {formatCurrency(user.currentBalance, 'BRL', 'pt-BR')}
                      </span>
                    </div>
                  </Fragment>
                )}
                {assetQuantityInWallet > 0 && (
                  <Fragment>
                    <DropdownMenuSeparator />
                    {isAssetBeingSold && (
                      <div className='flex w-full justify-between'>
                        <span className='font-medium text-foreground'>Valor Pago por Ativo</span>
                        <span className='font-medium text-foreground'>
                          {formatCurrency(
                            Number(asset?.type === 'Purchase' ? asset.purchasePrice : asset?.sellingPrice),
                            'BRL',
                            'pt-BR',
                          )}
                        </span>
                      </div>
                    )}
                    <div className='flex w-full justify-between'>
                      <span className='font-medium text-foreground'>Quantidade em sua Carteira</span>
                      <span className='font-medium text-foreground'>{assetQuantityInWallet} Unidades</span>
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
            onClick={handleConfirmAction}
            disabled={isTotalPriceMoreThanUserBalance && transaction === 'purchase'}
          >
            {textContent.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
