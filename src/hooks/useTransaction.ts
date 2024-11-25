import { useInvestmentAssets } from '@/providers/InvestmentAssetsProvider';
import { useUserAccount } from '@/providers/userAccountProvider';
import { formatCurrency } from '@/utils/currency';
import { calculateTransactionProfitDetails } from '@/utils/number';
import { isToday, startOfToday } from 'date-fns';
import { toast } from 'sonner';
import { useAchievements } from './useAchievements.tsx';

export const useTransaction = () => {
  const { verifyAchievements } = useAchievements();
  const { user, updateUser } = useUserAccount();
  const { assets } = useInvestmentAssets();

  function buyAsset(id: string, quantity: number, price: number) {
    const walletAsset = user.currentWallet.find((asset) => asset.id === id);
    const isAssetAlreadyInWallet = typeof walletAsset !== 'undefined';
    const marketAsset = assets.find((asset) => asset.id === id);
    const transactionValue = price * quantity;

    if (!marketAsset) return;

    const purchasedAsset = isAssetAlreadyInWallet
      ? {
          ...walletAsset,
          quantity: walletAsset.quantity + quantity,
          totalInvestment: walletAsset.totalInvestment + transactionValue,
        }
      : {
          id,
          quantity,
          sellingPrice: 0,
          purchasePrice: price,
          type: 'Purchase' as const,
          totalInvestment: transactionValue,
        };

    const currentTransaction = {
      id,
      quantity,
      purchasePrice: price,
      type: 'Purchase' as const,
      sellingPrice: walletAsset?.sellingPrice ?? 0,
      totalInvestment: purchasedAsset.totalInvestment,
    };

    const currentTransactionHistory =
      user.transactionHistory.length === 300
        ? [...user.transactionHistory.slice(-150), currentTransaction]
        : [...user.transactionHistory, currentTransaction];

    const currentBalance = user.currentBalance - transactionValue;
    const currentWallet = [...user.currentWallet.filter((asset) => asset.id !== id), purchasedAsset];

    user.currentWallet = currentWallet;
    user.currentBalance = currentBalance;
    user.transactionHistory = currentTransactionHistory;

    const walletHistory = user.walletHistory.at(-1);
    const balanceHistory = user.balanceHistory.at(-1);

    if (!balanceHistory || !isToday(balanceHistory.date)) {
      user.balanceHistory.push({ date: startOfToday(), balance: currentBalance });
    } else balanceHistory.balance = currentBalance;

    if (!walletHistory || !isToday(walletHistory.date)) {
      user.walletHistory.push({ date: startOfToday(), wallet: currentWallet });
    } else walletHistory.wallet = currentWallet;

    toast.message('Ativo adquirido! 🎉', {
      duration: 5000,
      position: 'bottom-right',
      description: `Você acaba de comprar ${quantity} unidades de ${marketAsset.name}.`,
    });

    const userWithUpdatedAchievements = verifyAchievements({
      user,
      currentTransaction,
      transactionType: currentTransaction.type,
    });

    updateUser(userWithUpdatedAchievements);
  }

  function sellAsset(id: string, quantity: number, price: number) {
    const walletAsset = user.currentWallet.find((asset) => asset.id === id);
    if (!walletAsset) return;

    const transaction = calculateTransactionProfitDetails(
      price,
      quantity,
      walletAsset.totalInvestment,
      walletAsset.quantity,
    );

    const isAssetBeingRemoved = quantity === walletAsset.quantity;
    const currentBalance = user.currentBalance + transaction.transactionValue;
    const currentProfitability = user.currentProfitability + transaction.assetProfit;
    const filteredAssets = user.currentWallet.filter((asset) => asset.id !== id);

    const currentWallet = isAssetBeingRemoved
      ? filteredAssets
      : [
          ...filteredAssets,
          {
            id: walletAsset.id,
            sellingPrice: price,
            type: 'Sale' as const,
            purchasePrice: walletAsset.purchasePrice,
            quantity: walletAsset.quantity - quantity,
            totalInvestment: walletAsset.totalInvestment - transaction.proportionateInvestment,
          },
        ];

    const currentTransaction = {
      id,
      quantity,
      sellingPrice: price,
      type: 'Sale' as const,
      purchasePrice: walletAsset.purchasePrice,
      totalInvestment: walletAsset.totalInvestment,
    };

    const currentTransactionHistory =
      user.transactionHistory.length === 300
        ? [...user.transactionHistory.slice(-150), currentTransaction]
        : [...user.transactionHistory, currentTransaction];

    user.currentWallet = currentWallet;
    user.currentBalance = currentBalance;
    user.currentProfitability = currentProfitability;
    user.transactionHistory = currentTransactionHistory;

    const walletHistory = user.walletHistory.at(-1);
    const balanceHistory = user.balanceHistory.at(-1);
    const profitabilityHistory = user.profitabilityHistory.at(-1);

    if (!balanceHistory || !isToday(balanceHistory.date)) {
      user.balanceHistory.push({ date: startOfToday(), balance: currentBalance });
    } else balanceHistory.balance = currentBalance;

    if (!walletHistory || !isToday(walletHistory.date)) {
      user.walletHistory.push({ date: startOfToday(), wallet: currentWallet });
    } else walletHistory.wallet = currentWallet;

    if (!profitabilityHistory || !isToday(profitabilityHistory.date)) {
      user.profitabilityHistory.push({ date: startOfToday(), profitability: transaction.assetProfit });
    } else profitabilityHistory.profitability = profitabilityHistory.profitability + transaction.assetProfit;

    if (transaction.assetProfit > 0) {
      toast.message('Parabéns! 🎉', {
        duration: 5000,
        position: 'bottom-right',
        description: `Você registrou um lucro de ${formatCurrency(transaction.assetProfit, 'BRL', 'pt-BR')}. Continue assim!`,
      });
    } else if (transaction.assetProfit < 0) {
      toast.message('Não foi dessa vez... 😕', {
        duration: 5000,
        position: 'bottom-right',
        description: `Você registrou uma perda de ${formatCurrency(transaction.assetProfit, 'BRL', 'pt-BR')}. Não desanime, é parte do processo.`,
      });
    } else {
      toast.message('Tudo em equilíbrio!', {
        duration: 5000,
        position: 'bottom-right',
        description: 'Você não teve lucros nem perdas. Um bom momento para revisar suas estratégias!',
      });
    }

    const userWithUpdatedAchievements = verifyAchievements({
      user,
      transaction,
      currentTransaction,
      transactionType: currentTransaction.type,
    });

    updateUser(userWithUpdatedAchievements);
  }

  return { buyAsset, sellAsset };
};
