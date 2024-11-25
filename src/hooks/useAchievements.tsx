import type { Achievement, User } from '@/lib/schemas/user.schema';
import { useConfetti } from '@/providers/confettiProvider';
import { useInvestmentAssets } from '@/providers/InvestmentAssetsProvider';
import { findAchievement } from '@/utils/achievement';
import { getAssetValue } from '@/utils/asset';
import { generateCurrentWeekData } from '@/utils/chart';
import { calculateTransactionProfitDetails } from '@/utils/number';
import { Trophy } from 'lucide-react';
import { toast } from 'sonner';

type VerifyAchievements = {
  user: User;
  currentTransaction: User['transactionHistory'][number];
} & (
  | { transactionType: 'Purchase' }
  | { transactionType: 'Sale'; transaction: ReturnType<typeof calculateTransactionProfitDetails> }
);

export const useAchievements = () => {
  const { handleShootConfetti } = useConfetti();
  const { assets } = useInvestmentAssets();

  function validateAchievementStatus(user: User, achievementName: Achievement) {
    const achievement = findAchievement(user, achievementName);
    if (achievement && !achievement.isCompleted) {
      achievement.isCompleted = true;

      toast.message(
        <div className='flex items-center justify-center pb-0.5 leading-4'>
          <Trophy className='ml-3 min-h-8 min-w-8 stroke-foreground' />
          <div className='flex flex-col items-center text-center'>
            <span className='w-fit text-lg font-bold'>{achievement.name}</span>
            <div className='flex flex-col items-center'>
              <b className='-mt-[2.5px] text-sm font-semibold'>Conquista Desbloqueada!</b>
              <span className='px-4 text-xs'>{achievement.description}</span>
            </div>
          </div>
        </div>,
        { duration: 8000, position: 'top-center', className: 'p-2.5' },
      );

      handleShootConfetti();
    }
  }

  function verifyAchievements(context: VerifyAchievements) {
    const isFirstAcquisition =
      context.transactionType === 'Purchase' &&
      context.user.transactionHistory.filter(({ type }) => type === 'Purchase').length === 1;

    const isFirstProfit = context.transactionType === 'Sale' && context.transaction.assetProfit > 0;

    const isExperiencedSalesman =
      context.transactionType === 'Sale' &&
      context.user.transactionHistory.filter(({ type }) => type === 'Sale').length === 100;

    const hasDiversePortfolio =
      context.transactionType === 'Purchase' &&
      Array.from(
        new Set(context.user.currentWallet.map(({ id }) => getAssetValue(id, assets, 'type'))),
      ).filter((type) => type !== null).length >= 2;

    const isLowRiskInvestor =
      context.transactionType === 'Purchase' &&
      context.user.currentWallet.filter(({ id }) => getAssetValue(id, assets, 'profile') === 'low-risk')
        .length >= 6;

    const isCryptoInvestor =
      context.transactionType === 'Purchase' &&
      context.user.currentWallet.filter(({ id }) => getAssetValue(id, assets, 'type') === 'Crypto').length >=
        10;

    const isCommodityInvestor =
      context.transactionType === 'Purchase' &&
      context.user.currentWallet.filter(({ id }) => getAssetValue(id, assets, 'type') === 'Commodity')
        .length >= 3;

    const isHighRiskInvestor =
      context.transactionType === 'Purchase' &&
      context.user.currentWallet.filter(({ id }) => getAssetValue(id, assets, 'profile') === 'high-risk')
        .length >= 5;

    const isDailyMillionaire =
      context.transactionType === 'Sale' &&
      (context.user.profitabilityHistory.at(-1)?.profitability ?? 0) >= 10_000;

    const isWeeklyGenius =
      context.transactionType === 'Sale' &&
      generateCurrentWeekData(context.user.profitabilityHistory).reduce((total, { profitability }) => {
        return total + profitability;
      }, 0) >= 100_000;

    const isActiveTrader =
      (context.transactionType === 'Purchase' || context.transactionType === 'Sale') &&
      context.user.transactionHistory.length >= 50;

    const isAssetCollector =
      context.transactionType === 'Purchase' && context.user.currentWallet.length >= 20;

    const hasBigProfit = context.transactionType === 'Sale' && context.transaction.assetProfit >= 10_000;

    const hasOneMillion = context.transactionType === 'Sale' && context.user.currentBalance >= 1_000_000;

    if (isFirstAcquisition) validateAchievementStatus(context.user, 'Primeira Aquisição');
    if (isFirstProfit) validateAchievementStatus(context.user, 'Primeiro Lucro');
    if (isExperiencedSalesman) validateAchievementStatus(context.user, 'Vendedor Experiente');
    if (hasDiversePortfolio) validateAchievementStatus(context.user, 'Diversificador de Portfólio');
    if (isLowRiskInvestor) validateAchievementStatus(context.user, 'Investidor Conservador');
    if (isCryptoInvestor) validateAchievementStatus(context.user, 'Explorador de Cripto');
    if (isCommodityInvestor) validateAchievementStatus(context.user, 'Comerciante de Commodities');
    if (isHighRiskInvestor) validateAchievementStatus(context.user, 'Caçador de Riscos');
    if (isDailyMillionaire) validateAchievementStatus(context.user, 'Milionário do Dia');
    if (isWeeklyGenius) validateAchievementStatus(context.user, 'Gênio da Semana');
    if (isActiveTrader) validateAchievementStatus(context.user, 'Trader Ativo');
    if (isAssetCollector) validateAchievementStatus(context.user, 'Colecionador de Ativos');
    if (hasBigProfit) validateAchievementStatus(context.user, 'Grande Lucro');
    if (hasOneMillion) validateAchievementStatus(context.user, 'Primeiro Milhão');

    const isInvestmentMaster = context.user.achievements
      .filter(({ name }) => name !== 'Mestre dos Investimentos')
      .every(({ isCompleted }) => isCompleted);

    if (isInvestmentMaster) validateAchievementStatus(context.user, 'Mestre dos Investimentos');
    return context.user;
  }

  return { verifyAchievements };
};
