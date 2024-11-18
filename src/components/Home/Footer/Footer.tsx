import Logo from '@/assets/logos/svgs/logo.svg?react';
import { TextShimmer } from '@/components/ui/text-shimmer';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='flex w-full flex-col items-center justify-center gap-3 border-t bg-neutral-100 py-5 dark:border-t-stone-800 dark:bg-black max-sm:py-4'>
      <Logo className='size-24' />
      <div className='text-center text-sm font-medium text-foreground dark:text-muted-foreground'>
        <p>
          © {currentYear} {''}
          <TextShimmer duration={1.2}>Futuro Financeiro.</TextShimmer>
        </p>
        <p>Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};
