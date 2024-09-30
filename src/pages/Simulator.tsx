import { InvestmentAssets } from '@/components/Simulator/InvestmentAssets';
import { RecentPurchases } from '@/components/Simulator/RecentPurchases';
import { Summary } from '@/components/Simulator/Summary';

export default function Simulator() {
  return (
    <section className='grid h-full grid-rows-3 gap-8'>
      <Summary />
      <div className='row-span-2 grid w-full grid-cols-4 gap-8'>
        <InvestmentAssets />
        <RecentPurchases />
      </div>
    </section>
  );
}
