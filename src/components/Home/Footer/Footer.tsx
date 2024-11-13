import Logo from '@/assets/logos/svgs/logo.svg?react';
import { TextShimmer } from '@/components/ui/text-shimmer';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='flex w-full flex-col items-center justify-center gap-3 border-t border-t-stone-800 bg-black py-5 max-sm:py-4'>
      <Logo className='size-24' />
      <div className='text-center text-sm font-medium text-muted-foreground'>
        <p>
          © {currentYear} {''}
          <TextShimmer duration={1.2}>Futuro Financeiro.</TextShimmer>
        </p>
        <p>Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
