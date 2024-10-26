import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInvestmentAssets } from '@/providers/InvestmentAssetsProvider';
import { useUserAccount } from '@/providers/userAccountProvider';
import { calculateTotalHoldingsValue, getAssetVariation } from '@/utils/number';
import { Coins, DollarSign, Wallet } from 'lucide-react';
import { Countdown } from './Countdown';
import { NumberDisplay } from './NumberDisplay';
import { Chart } from './Chart';

export function Summary() {
  const { assets } = useInvestmentAssets();
  const { user } = useUserAccount();

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
    user.balanceHistory.at(-2)?.balance ?? 10000,
    user.balanceHistory.at(-1)?.balance ?? 10000,
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
      <Chart />
    </div>
  );
}
