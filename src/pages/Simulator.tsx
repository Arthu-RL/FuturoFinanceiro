import { InvestmentAssets } from '@/components/Simulator/InvestmentAssets';
import { Summary } from '@/components/Simulator/Summary';

export default function Simulator() {
  return (
    <section className='grid grid-rows-[1fr_2.5fr] gap-8'>
      <Summary />
      <div>
        <InvestmentAssets />
      </div>
    </section>
  );
}
