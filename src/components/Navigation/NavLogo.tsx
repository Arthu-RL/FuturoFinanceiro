import { ChartNoAxesCombined } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NavLogo = () => {
  return (
    <Link to='/' className='mr-10 flex items-center font-openSans'>
      <ChartNoAxesCombined className='h-6 w-6' />
      <span className='px-4 font-semibold'>SimuladorDeInvestimentos</span>
    </Link>
  );
};
