import { Button } from '@/components/ui/button';
import { Assets } from '@/lib/schemas/assets.schema';
import { Badge } from '@/components/ui/badge';
import { translateAssetCategory } from '@/utils/string';
import { Fragment, useState } from 'react';
import { Row } from '@tanstack/react-table';
import { Minus, Plus } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';
import { useUserAccount } from '@/providers/userAccountProvider';
import { AssetVariation } from './AssetVariation';
import { DropdownMenuSeparator } from '../ui/dropdown-menu';
import { useTransaction } from '@/hooks/useTransaction';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type TransactionModalProps = {
  row: Row<Assets>;
  transaction: 'buy' | 'sell';
  textContent: { trigger: string; confirm: string };
};

export function TransactionModal({ row, transaction, textContent }: TransactionModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { user } = useUserAccount();
  const { buyAsset, sellAsset } = useTransaction();

  const assetInWallet = user.currentWallet.find(({ id }) => id === row.original.id);
  const assetQuantityInWallet = assetInWallet?.quantity ?? 0;
  const isTotalPriceMoreThanUserBalance = quantity * row.original.value.current > user.currentBalance;
  const asset = user.currentWallet.find(({ id }) => id === row.original.id);
  const currentTotalPrice = row.original.value.current * Number(assetInWallet?.quantity);
  const isAssetBeingSold = transaction === 'sell';
  const currentPurchasePrice = Number(asset?.totalInvestment);
  const totalPricePurchasePriceDifference = currentTotalPrice - currentPurchasePrice;

  function handleUpdateQuantity(action: number) {
    setQuantity((current) => {
      const sum = current + action;
      if (transaction === 'sell') return sum <= Number(asset?.quantity) && sum > 0 ? sum : current;
      return sum > 0 ? (current += action) : 1;
    });
  }

  function handleConfirmAction() {
    if (transaction === 'buy') {
      buyAsset(row.original.id, quantity, row.original.value.current);
    }

    if (transaction === 'sell' && asset) {
      sellAsset(row.original.id, quantity, row.original.value.current);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' className='h-8 w-full justify-start rounded-sm px-2'>
          {textContent.trigger}
        </Button>
      </AlertDialogTrigger>
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
                      <span className='font-medium text-foreground'>Valor Total a Receber</span>
                      <span className={`font-medium text-foreground transition-all`}>
                        {formatCurrency(row.original.value.current * quantity, 'BRL', 'pt-BR')}
                      </span>
                    </div>
                    <div className='flex w-full justify-between'>
                      <span className='font-medium text-foreground'>Custo Total de Aquisição</span>
                      <span className={`font-medium text-foreground transition-all`}>
                        {formatCurrency(Number(asset?.totalInvestment), 'BRL', 'pt-BR')}
                      </span>
                    </div>
                    <div className='flex w-full justify-between'>
                      <span
                        className={`font-medium text-foreground ${totalPricePurchasePriceDifference > 0 ? 'text-green-500' : totalPricePurchasePriceDifference < 0 ? 'text-red-600' : 'text-foreground'}`}
                      >
                        Situação:{' '}
                        {totalPricePurchasePriceDifference > 0
                          ? 'Lucro'
                          : totalPricePurchasePriceDifference < 0
                            ? 'Prejuízo'
                            : 'Estável'}
                      </span>
                      <span
                        className={`font-medium text-foreground transition-all ${totalPricePurchasePriceDifference > 0 ? 'text-green-500' : totalPricePurchasePriceDifference < 0 ? 'text-red-600' : 'text-foreground'}`}
                      >
                        {formatCurrency(totalPricePurchasePriceDifference, 'BRL', 'pt-BR')}
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

                {assetQuantityInWallet > 0 && asset?.type === 'Purchase' && (
                  <Fragment>
                    <DropdownMenuSeparator />
                    {isAssetBeingSold && (
                      <div className='flex w-full justify-between'>
                        <span className='font-medium text-foreground'>Valor Pago por Ativo</span>
                        <span className='font-medium text-foreground'>
                          {formatCurrency(Number(asset.purchasePrice), 'BRL', 'pt-BR')}
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
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmAction}
            disabled={isTotalPriceMoreThanUserBalance && transaction === 'buy'}
          >
            {textContent.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
