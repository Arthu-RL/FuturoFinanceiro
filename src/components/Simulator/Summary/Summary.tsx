import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInvestmentAssets } from '@/providers/InvestmentAssetsProvider';
import { useUserAccount } from '@/providers/userAccountProvider';
import { formatCurrency } from '@/utils/currency';
import { calculateTotalHoldingsValue, getAssetVariation } from '@/utils/number';
import { Activity, Coins, DollarSign, Wallet } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { Countdown } from './Countdown';
import { NumberDisplay } from './NumberDisplay';
import { useMemo } from 'react';

export function Summary() {
  const { assets } = useInvestmentAssets();
  const { user } = useUserAccount();

  const data = useMemo(() => {
    return Array.from({ length: 7 })
      .map((_, index) => index + 1)
      .map(() => ({ revenue: Math.random() * user.currentBalance }));
  }, [user.currentBalance]);

  const totalAssets = user.currentWallet.reduce((total, asset) => {
    return calculateTotalHoldingsValue(total, assets, asset);
  }, 0);

  const holdingsDifference = getAssetVariation(
    user.walletHistory.at(-2)?.wallet.reduce((total, asset) => {
      return calculateTotalHoldingsValue(total, assets, asset);
    }, 0) ?? 0,
    user.walletHistory.at(-1)?.wallet.reduce((total, asset) => {
      return calculateTotalHoldingsValue(total, assets, asset);
    }, 0) ?? 0,
  );

  const profitabilityDifference = getAssetVariation(
    user.profitabilityHistory.at(-2)?.profitability ?? 0,
    user.profitabilityHistory.at(-1)?.profitability ?? 0,
  );

  const balanceDifference = getAssetVariation(
    user.balanceHistory.at(-2)?.balance ?? 0,
    user.balanceHistory.at(-1)?.balance ?? 0,
  );

  return (
    <div className='row-span-1 grid grid-cols-4 items-stretch gap-8 max-2xl:gap-4 max-xl:grid-cols-1'>
      <div className='flex h-full flex-col gap-6'>
        <Countdown />
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Saldo</CardTitle>
            <Wallet className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <NumberDisplay value={user.currentBalance} valueDifference={balanceDifference} animated />
          </CardContent>
        </Card>
      </div>
      <Card className='self-end'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Patrimônio em Ativos</CardTitle>
          <Coins className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <NumberDisplay value={totalAssets} valueDifference={holdingsDifference} animated />
        </CardContent>
      </Card>
      <Card className='self-end'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Rentabilidade Total</CardTitle>
          <DollarSign className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <NumberDisplay
            value={user.currentProfitability}
            valueDifference={profitabilityDifference}
            animated
          />
        </CardContent>
      </Card>
      <Card className='grid grid-rows-[0.5fr_auto]'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Lucro Semanal</CardTitle>
          <Activity className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent className='grid grid-rows-[2rem_1rem_auto]'>
          <div className='text-2xl font-bold'>{formatCurrency(0, 'BRL', 'pt-BR')}</div>
          <p className='text-xs text-muted-foreground'>Lucro acumulado nesta semana</p>
          <div>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={data} margin={{ top: 25, right: 10, left: 10, bottom: 5 }}>
                <Line
                  type='monotone'
                  strokeWidth={2}
                  dataKey='revenue'
                  activeDot={{ r: 6, style: { fill: '#FFFFFF', opacity: 0.25 } }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
