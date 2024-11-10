import LogoVariant from '@/assets/logos/svgs/logo_variant.svg?react';

import { TextEffect } from '@/components/ui/text-effect';
import { useIsIntersecting } from '@/hooks/useIsIntersecting';
import { Spotlight } from '@/components/ui/spotlight';
import { InView } from '@/components/ui/in-view';

export const AboutUsHeading = () => {
  const { ref, isIntersecting } = useIsIntersecting<HTMLDivElement>();

  return (
    <div className='z-10 grid w-fit grid-cols-2 items-center gap-28 font-manrope max-2xl:gap-20 max-xl:grid-cols-1 max-xl:gap-16 max-sm:gap-8'>
      <div ref={ref} className='flex flex-col gap-3 max-xl:order-1'>
        <TextEffect
          trigger={isIntersecting}
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
          trigger={isIntersecting}
          className='text-pretty text-lg max-2xl:text-base max-sm:text-sm'
        >
          Nossa plataforma tem o objetivo de capacitar jovens com conhecimentos práticos sobre finanças e
          investimentos. Com foco em simulações e conteúdos diretos, queremos ajudar você a desenvolver
          habilidades fundamentais para um futuro financeiro saudável. A iniciativa faz parte de um projeto de
          extensão do UniFOA, unindo teoria e prática para uma formação completa.
        </TextEffect>
      </div>
      <Spotlight className='self-start max-xl:-top-56' trigger={isIntersecting} />
      <InView
        variants={{
          hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        }}
        viewOptions={{ margin: '0px 0px -200px 0px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <LogoVariant className='h-fit w-full max-w-[40rem] text-[#0B2333] drop-shadow-xl dark:text-gray-200 max-xl:max-w-full' />
      </InView>
    </div>
  );
};
