import Logo from '@/assets/logos/svgs/logo.svg?react';

import { TextEffect } from '@/components/ui/text-effect';
import { useIsIntersecting } from '@/hooks/useIsIntersecting';
import { Spotlight } from '@/components/ui/spotlight';
import { InView } from '@/components/ui/in-view';

export const AboutUsHeading = () => {
  const { ref: containerRef, isIntersecting: isContainerIntersecting } = useIsIntersecting<HTMLDivElement>({
    options: { rootMargin: '-300px', threshold: 0 },
  });

  const { ref: headingRef, isIntersecting: isHeadingIntersecting } = useIsIntersecting<HTMLDivElement>({
    options: { rootMargin: '-300px', threshold: 0 },
  });

  return (
    <div
      ref={containerRef}
      className='max-sm:gap-15 z-10 grid w-fit grid-cols-2 items-center gap-[9.75rem] font-manrope max-2xl:gap-28 max-xl:grid-cols-1 max-xl:gap-14'
    >
      <div ref={headingRef} className='flex flex-col gap-4 py-9 max-xl:order-1 max-sm:gap-3 max-sm:py-0'>
        <TextEffect
          trigger={isContainerIntersecting}
          className='text-5xl font-bold max-2xl:text-4xl max-xl:text-2xl max-sm:text-xl'
          variants={{
            container: {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
            },
            item: {
              hidden: { opacity: 0, rotateX: 90, y: 10 },
              visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.2 } },
            },
          }}
        >
          O Que é a Plataforma de Educação Financeira?
        </TextEffect>
        <TextEffect
          delay={0.5}
          trigger={isHeadingIntersecting}
          className='text-pretty text-lg max-2xl:text-base max-sm:text-sm'
        >
          Nossa plataforma tem o objetivo de capacitar jovens com conhecimentos práticos sobre finanças e
          investimentos. Com foco em simulações e conteúdos diretos, queremos ajudar você a desenvolver
          habilidades fundamentais para um futuro financeiro saudável. A iniciativa faz parte de um projeto de
          extensão do UniFOA, unindo teoria e prática para uma formação completa.
        </TextEffect>
      </div>
      <Spotlight className='self-start max-xl:-top-56' trigger={isContainerIntersecting} />
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        }}
        viewOptions={{ margin: '0px 0px -200px 0px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className='flex items-center gap-7 drop-shadow-xl max-xl:justify-center max-sm:w-full max-sm:gap-4 max-sm:pt-7'>
          <Logo className='h-fit w-full max-w-[14rem] max-2xl:max-w-[12rem] max-sm:max-w-[9rem]' />
          <b className='bg-gradient-to-b from-[#0B2333]/80 to-[#0B2333] bg-clip-text font-manrope text-6xl font-extrabold text-transparent dark:from-slate-50 dark:to-slate-400 max-2xl:text-5xl max-sm:max-w-[12.85rem] max-sm:text-[2.5rem] max-[385px]:max-w-[10.35rem] max-[385px]:text-[2rem]'>
            Futuro Financeiro
          </b>
        </div>
      </InView>
    </div>
  );
};
