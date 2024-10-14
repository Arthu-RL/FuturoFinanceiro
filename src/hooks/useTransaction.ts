import { useInvestmentAssets } from '@/providers/InvestmentAssetsProvider';
import { useUserAccount } from '@/providers/userAccountProvider';
import { formatCurrency } from '@/utils/currency';
import { isToday, startOfToday } from 'date-fns';
import { toast } from 'sonner';

export const useTransaction = () => {
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
          purchasePrice: price,
          type: 'Purchase' as const,
          totalInvestment: transactionValue,
        };

    const currentTransaction = {
      id,
      quantity,
      purchasePrice: price,
      type: 'Purchase' as const,
      totalInvestment: purchasedAsset.totalInvestment,
    };

    const currentBalance = user.currentBalance - transactionValue;
    const currentWallet = [...user.currentWallet.filter((asset) => asset.id !== id), purchasedAsset];

    user.currentWallet = currentWallet;
    user.currentBalance = currentBalance;
    user.transactionHistory.push(currentTransaction);

    const walletHistory = user.walletHistory.at(-1);
    const balanceHistory = user.balanceHistory.at(-1);

    if (!balanceHistory || !isToday(balanceHistory.date)) {
      user.balanceHistory.push({ date: startOfToday(), balance: currentBalance });
    } else balanceHistory.balance = currentBalance;

    if (!walletHistory || !isToday(walletHistory.date)) {
      user.walletHistory.push({ date: startOfToday(), wallet: currentWallet });
    } else walletHistory.wallet = currentWallet;

    toast.message('Ativo adquirido! 🎉', {
      duration: 10000,
      description: `Você acaba de comprar ${quantity} unidades de ${marketAsset.name}. Acompanhe de perto o seu desempenho!`,
    });

    updateUser(user);
  }

  function sellAsset(id: string, quantity: number, price: number) {
    const walletAsset = user.currentWallet.find((asset) => asset.id === id);
    if (!walletAsset) return;

    const transactionValue = price * quantity;
    const isAssetBeingRemoved = quantity === walletAsset.quantity;

    const proportionateInvestment = (walletAsset.totalInvestment / walletAsset.quantity) * quantity;
    const assetProfit = transactionValue - proportionateInvestment;

    const currentBalance = user.currentBalance + transactionValue;
    const currentProfitability = user.currentProfitability + assetProfit;
    const filteredAssets = user.currentWallet.filter((asset) => asset.id !== id);

    const currentWallet = isAssetBeingRemoved
      ? filteredAssets
      : [
          ...filteredAssets,
          {
            id: walletAsset.id,
            sellingPrice: price,
            type: 'Sale' as const,
            quantity: walletAsset.quantity - quantity,
            totalInvestment: walletAsset.totalInvestment - proportionateInvestment,
          },
        ];

    const currentTransaction = {
      id,
      quantity,
      sellingPrice: price,
      type: 'Sale' as const,
      totalInvestment: walletAsset.totalInvestment,
    };

    user.currentWallet = currentWallet;
    user.currentBalance = currentBalance;
    user.currentProfitability = currentProfitability;
    user.transactionHistory.push(currentTransaction);

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
      user.profitabilityHistory.push({ date: startOfToday(), profitability: currentProfitability });
    } else profitabilityHistory.profitability = currentProfitability;

    if (assetProfit > 0) {
      toast.message('Parabéns! 🎉', {
        duration: 8000,
        description: `Você registrou um lucro de ${formatCurrency(assetProfit, 'BRL', 'pt-BR')}. Continue assim!`,
      });
    } else if (assetProfit < 0) {
      toast.message('Não foi dessa vez... 😕', {
        duration: 8000,
        description: `Você registrou uma perda de ${formatCurrency(assetProfit, 'BRL', 'pt-BR')}. Não desanime, é parte do processo.`,
      });
    } else {
      toast.message('Tudo em equilíbrio!', {
        duration: 8000,
        description: 'Você não teve lucros nem perdas. Um bom momento para revisar suas estratégias!',
      });
    }

    updateUser(user);
  }

  return { buyAsset, sellAsset };
};
