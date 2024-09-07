import { ChartNoAxesCombined } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NavLogo = () => {
  return (
    <Link to='/' className='font-openSans mr-10 flex items-center'>
      <ChartNoAxesCombined className='h-6 w-6' />
      {/* Precisamos de um nome para o app?? */}
      <span className='px-4 font-semibold'>Investimentos</span>
    </Link>
  );
};
