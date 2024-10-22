import { useUserAccount } from '@/providers/userAccountProvider';
import { Table } from '@tanstack/react-table';
import { Assets } from '@/lib/schemas/assets.schema';
import { useEffect, useState } from 'react';
import { useTransaction } from './useTransaction';
import type { TransactionType } from '@/lib/schemas/user.schema';

type UseAssetModal = {
  columnId: string;
  table: Table<Assets>;
  modalState: { currentState: boolean; setState: (value: boolean) => void };
};

export const useAssetModal = ({ table, columnId, modalState }: UseAssetModal) => {
  const [assetToPurchaseQuantity, setAssetToPurchaseQuantity] = useState(1);

  const { buyAsset, sellAsset } = useTransaction();
  const { user } = useUserAccount();

  const row = table.getRow(columnId);
  const assetInWallet = user.currentWallet.find(({ id }) => id === row.original.id);

  const assetId = row.original.id;
  const assetHistory = row.original.history;
  const assetCurrentPrice = row.original.value.current;

  const userCurrentBalance = user.currentBalance;
  const purchasePrice = assetInWallet?.purchasePrice ?? 0;
  const assetInWalletQuantity = assetInWallet?.quantity ?? 0;
  const assetInWalletTotalInvestment = assetInWallet?.totalInvestment ?? 0;

  function handleUpdateQuantity(action: number, transaction: TransactionType) {
    setAssetToPurchaseQuantity((currentQuantity) => {
      const sum = currentQuantity + action;
      if (transaction === 'Sale') return sum <= assetInWalletQuantity && sum > 0 ? sum : currentQuantity;
      return sum > 0 ? (currentQuantity += action) : 1;
    });
  }

  function handleConfirmAction(transaction: TransactionType) {
    if (transaction === 'Purchase') buyAsset(assetId, assetToPurchaseQuantity, assetCurrentPrice);
    if (transaction === 'Sale') sellAsset(assetId, assetToPurchaseQuantity, assetCurrentPrice);
    modalState.setState(false);
  }

  useEffect(() => setAssetToPurchaseQuantity(1), [modalState.currentState]);

  return {
    row,
    assetHistory,
    purchasePrice,
    assetCurrentPrice,
    userCurrentBalance,
    assetInWalletQuantity,
    assetToPurchaseQuantity,
    assetInWalletTotalInvestment,
    handleConfirmAction,
    handleUpdateQuantity,
  };
};
