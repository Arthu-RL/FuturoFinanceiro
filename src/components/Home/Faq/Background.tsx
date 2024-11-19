import { Vortex } from '@/components/ui/vortex';
import { Fragment, ReactNode } from 'react';

type BackgroundProps = {
  children: ReactNode;
};

export const Background = ({ children }: BackgroundProps) => {
  return (
    <Fragment>
      <div className='absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-white bg-vertical-black/[0.15] dark:hidden dark:bg-black dark:bg-vertical-white/[0.15] max-sm:dark:block'>
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)] dark:bg-black'></div>
      </div>
      <Vortex
        containerClassName='py-20 pl-56 pr-40 max-2xl:pl-36 max-2xl:pr-20 max-xl:pl-[6.5rem] max-xl:pr-10 max-xl:pt-10 max-sm:px-4 max-sm:pb-16'
        className='grid w-full grid-cols-1 items-center gap-16 max-xl:gap-20 max-sm:gap-8'
        rangeY={500}
        rangeSpeed={0.5}
        particleCount={500}
      >
        {children}
      </Vortex>
    </Fragment>
  );
};
