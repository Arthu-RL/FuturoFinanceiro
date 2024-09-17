import InvestmentCard from '@/components/Simulator/InvestmentCard/InvestmentCard';
import { Balance } from '@/components/Simulator/Balance/Balance';

export default function Simulator() {
  return (
    <div className='p-10'>
      <Balance />
      <InvestmentCard
        title='Investimento risco baixo'
        description="Lorem ipsum is placeholder text used in design and publishing to fill a space where content is not yet available. It is derived from a scrambled section of Cicero's De Finibus Bonorum et Malorum written in 45 BC."
      />
    </div>
  );
}
