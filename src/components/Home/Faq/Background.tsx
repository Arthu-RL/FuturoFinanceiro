import { Vortex } from '@/components/ui/vortex';
import { Fragment, ReactNode } from 'react';

type BackgroundProps = {
  children: ReactNode;
};

export const Background = ({ children }: BackgroundProps) => {
  return (
    <Fragment>
      <div className='absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-white bg-vertical-black/[0.15] dark:hidden dark:bg-black dark:bg-vertical-white/[0.15] max-sm:dark:block'>
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_top,transparent_5%,black)] dark:bg-black'></div>
      </div>
      <Vortex
        rangeY={800}
        particleCount={500}
        baseHue={125}
        baseSpeed={0.05}
        rangeSpeed={0.05}
        className='grid w-full grid-cols-1 items-center gap-16 max-xl:gap-20 max-sm:gap-8'
      >
        {children}
      </Vortex>
    </Fragment>
  );
};
