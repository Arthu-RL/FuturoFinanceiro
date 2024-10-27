import { AssetsTable } from '@/components/Simulator/AssetsTable/AssetsTable';
import { RecentPurchases } from '@/components/Simulator/RecentPurchases';
import { Summary } from '@/components/Simulator/Summary/Summary';

export default function Simulator() {
  return (
    <section id='simulator' className='grid h-full grid-rows-[1fr_2fr] gap-4 max-2xl:grid-rows-[auto_auto]'>
      <Summary />
      <div className='grid w-full grid-cols-4 gap-4 max-2xl:grid-cols-1 max-2xl:grid-rows-[1fr_1fr] max-md:grid-rows-[1.25fr_0.5fr]'>
        <AssetsTable />
        <RecentPurchases />
      </div>
    </section>
  );
}
