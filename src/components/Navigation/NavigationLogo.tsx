import { ChartNoAxesCombined } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NavigationLogo = () => {
  return (
    <Link to='/' className='flex items-center font-openSans max-sm:mr-auto'>
      <ChartNoAxesCombined className='mb-1.5 size-9 rounded-full bg-stone-200 stroke-stone-900 p-1 max-sm:mb-0 max-sm:size-8' />
      <span className='px-4 text-sm font-semibold text-white sm:hidden'>Investimentos</span>
    </Link>
  );
};
