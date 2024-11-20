import { useUserAccount } from '@/providers/userAccountProvider';
import { ScrollArea } from '../../ui/scroll-area';
import { Achievement } from '@/lib/schemas/user.schema';
import { cloneElement, ReactElement } from 'react';
import { getAssetValue } from '@/utils/asset';
import { useInvestmentAssets } from '@/providers/InvestmentAssetsProvider';
import { generateCurrentWeekData } from '@/utils/chart';
import { formatNumberWithoutFractionDigits } from '@/utils/number';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import {
  Bitcoin,
  Boxes,
  Brain,
  BriefcaseBusiness,
  ChartNetwork,
  ChartSpline,
  Flame,
  Gem,
  Globe,
  HandCoins,
  Handshake,
  PiggyBank,
  Shield,
  Star,
  Trophy,
  Wheat,
  X,
} from 'lucide-react';

type AchievementsModal = {
  modalState: { currentState: boolean; setState: (state: boolean) => void };
};

export const AchievementsModal = ({ modalState }: AchievementsModal) => {
  const { assets } = useInvestmentAssets();
  const { user } = useUserAccount();

  const achievementsIcons: Record<
    Achievement,
    { complete?: string | number; icon: ReactElement; current?: string | number }
  > = {
    'Caçador de Riscos': {
      complete: 5,
      icon: <Flame />,
      current: user.currentWallet.filter(({ id }) => getAssetValue(id, assets, 'profile') === 'high-risk')
        .length,
    },

    'Colecionador de Ativos': {
      complete: 20,
      icon: <Boxes />,
      current: user.currentWallet.length,
    },

    'Comerciante de Commodities': {
      complete: 3,
      icon: <Wheat />,
      current: user.currentWallet.filter(({ id }) => getAssetValue(id, assets, 'type') === 'Commodity')
        .length,
    },

    'Diversificador de Portfólio': {
      complete: 2,
      icon: <Globe />,
      current: Array.from(
        new Set(user.currentWallet.map(({ id }) => getAssetValue(id, assets, 'type'))),
      ).filter((type) => type !== null).length,
    },

    'Explorador de Cripto': {
      complete: 10,
      icon: <Bitcoin />,
      current: user.currentWallet.filter(({ id }) => getAssetValue(id, assets, 'type') === 'Crypto').length,
    },

    'Grande Lucro': { icon: <HandCoins /> },

    'Gênio da Semana': {
      complete: formatNumberWithoutFractionDigits(100_000, 'pt-BR'),
      icon: <Brain />,
      current: formatNumberWithoutFractionDigits(
        generateCurrentWeekData(user.profitabilityHistory).reduce((total, { profitability }) => {
          return total + profitability;
        }, 0),
        'pt-BR',
      ),
    },

    'Investidor Conservador': {
      complete: 5,
      icon: <Shield />,
      current: user.currentWallet.filter(({ id }) => getAssetValue(id, assets, 'profile') === 'low-risk')
        .length,
    },

    'Mestre dos Investimentos': {
      complete: 15,
      icon: <BriefcaseBusiness />,
      current: user.achievements.filter(
        ({ name, isCompleted }) => isCompleted && name !== 'Mestre dos Investimentos',
      ).length,
    },

    'Milionário do Dia': {
      complete: formatNumberWithoutFractionDigits(10_000, 'pt-BR'),
      icon: <PiggyBank />,
      current: formatNumberWithoutFractionDigits(
        user.profitabilityHistory.at(-1)?.profitability ?? 0,
        'pt-BR',
      ),
    },

    'Primeira Aquisição': { icon: <Star /> },

    'Primeiro Lucro': { icon: <ChartSpline /> },

    'Primeiro Milhão': {
      complete: formatNumberWithoutFractionDigits(1_000_000, 'pt-BR'),
      icon: <Gem />,
      current: formatNumberWithoutFractionDigits(user.currentBalance, 'pt-BR'),
    },

    'Trader Ativo': { complete: 50, icon: <ChartNetwork />, current: user.transactionHistory.length },

    'Vendedor Experiente': {
      complete: 100,
      icon: <Handshake />,
      current: user.transactionHistory.filter(({ type }) => type === 'Sale').length,
    },
  };

  return (
    <AlertDialog open={modalState.currentState}>
      <AlertDialogContent
        className='px-0 pb-3 pt-0 max-sm:max-w-[90%]'
        onEscapeKeyDown={() => modalState.setState(false)}
        onInteractOutside={() => modalState.setState(false)}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className='relative flex items-center gap-2 border-b border-border px-2.5 py-1'>
            <AlertDialogAction
              onClick={() => modalState.setState(false)}
              className='absolute right-2 w-fit self-center bg-transparent p-0 shadow-none hover:bg-transparent'
            >
              <X size={18} className='stroke-foreground' />
            </AlertDialogAction>
            <Trophy className='size-5' />
            <span>Conquistas</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <ScrollArea className='mr-1.5 h-[600px] pl-2.5'>
              {user.achievements.map(({ name, description, isCompleted }) => {
                const current = achievementsIcons[name]['current'] ?? null;
                const complete = achievementsIcons[name]['complete'] ?? null;
                const hasAchievementStatus = current !== null && complete !== null;

                const icon = cloneElement(achievementsIcons[name]['icon'], {
                  className: 'size-9 stroke-foreground max-[400px]:size-8 min-[400px]:stroke-1',
                });

                return (
                  <div
                    key={name}
                    className='mr-4 flex items-center gap-4 rounded-md p-4 hover:bg-muted/50 [&:not(:last-child)]:mb-0'
                  >
                    {icon}
                    <div className='flex w-full flex-col text-left dark:text-muted-foreground'>
                      <div className='flex w-full flex-wrap items-center'>
                        <b className='font-bold text-foreground'>{name}</b>
                        {!isCompleted && hasAchievementStatus && (
                          <span className='ml-1 text-xs font-semibold text-foreground'>
                            - {`${current}/${complete}`}
                          </span>
                        )}
                        {isCompleted && (
                          <span className='ml-1 text-xs font-semibold text-green-500'>
                            <span className='text-foreground'>-</span> Completo!
                          </span>
                        )}
                      </div>
                      <p className='text-xs'>{description}</p>
                    </div>
                  </div>
                );
              })}
            </ScrollArea>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
