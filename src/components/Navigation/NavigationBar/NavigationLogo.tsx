import { ChartNoAxesCombined } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NavigationLogo = () => {
  return (
    <Link
      to='/'
      className='flex items-center'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ChartNoAxesCombined className='mb-1.5 size-9 rounded-full bg-stone-200 stroke-stone-900 p-1 max-sm:mb-0 max-sm:size-8' />
    </Link>
  );
};
