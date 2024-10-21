import { useUserAccount } from '@/providers/userAccountProvider';
import { Table } from '@tanstack/react-table';
import { Assets } from '@/lib/schemas/assets.schema';
import { useEffect, useState } from 'react';
import { useTransaction } from './useTransaction';

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
  const assetInWalletQuantity = assetInWallet?.quantity ?? 0;
  const assetInWalletTotalInvestment = assetInWallet?.totalInvestment ?? 0;
  const assetInWalletTransactionPrice =
    (assetInWallet?.type === 'Purchase' ? assetInWallet.purchasePrice : assetInWallet?.sellingPrice) ?? 0;

  function handleUpdateQuantity(action: number, transaction: string) {
    setAssetToPurchaseQuantity((currentQuantity) => {
      const sum = currentQuantity + action;
      if (transaction === 'sale') return sum <= assetInWalletQuantity && sum > 0 ? sum : currentQuantity;
      return sum > 0 ? (currentQuantity += action) : 1;
    });
  }

  function handleConfirmAction(transaction: string) {
    if (transaction === 'purchase') buyAsset(assetId, assetToPurchaseQuantity, assetCurrentPrice);
    if (transaction === 'sale') sellAsset(assetId, assetToPurchaseQuantity, assetCurrentPrice);
    modalState.setState(false);
  }

  useEffect(() => setAssetToPurchaseQuantity(1), [modalState.currentState]);

  return {
    row,
    assetHistory,
    assetCurrentPrice,
    userCurrentBalance,
    assetInWalletQuantity,
    assetToPurchaseQuantity,
    assetInWalletTransactionPrice,
    assetInWalletTotalInvestment,
    handleConfirmAction,
    handleUpdateQuantity,
  };
};
