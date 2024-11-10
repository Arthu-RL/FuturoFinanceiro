import { AssetsTable } from '@/components/Simulator/AssetsTable/AssetsTable';
import { RecentPurchases } from '@/components/Simulator/RecentPurchases';
import { Summary } from '@/components/Simulator/Summary/Summary';

export default function Simulator() {
  return (
    <section
      id='simulator'
      className='grid h-screen grid-rows-[1fr_2fr] gap-4 pb-14 pl-28 pr-14 pt-6 max-2xl:h-full max-2xl:grid-rows-[auto_auto] max-2xl:pb-12 max-2xl:pl-24 max-2xl:pr-8 max-2xl:pt-8 max-sm:px-4 max-sm:pb-8 max-sm:pt-20'
    >
      <Summary />
      <div className='grid w-full grid-cols-4 gap-4 max-2xl:grid-cols-1 max-2xl:grid-rows-[1fr_1fr] max-md:grid-rows-[1.25fr_0.5fr]'>
        <AssetsTable />
        <RecentPurchases />
      </div>
    </section>
  );
}
