import { TextEffect } from '@/components/ui/text-effect';
import { useIsIntersecting } from '@/hooks/useIsIntersecting';

export const Heading = () => {
  const { ref, isIntersecting } = useIsIntersecting<HTMLDivElement>({
    options: { rootMargin: '-100px', threshold: 0 },
  });

  return (
    <div
      ref={ref}
      className='relative flex flex-col gap-4 px-48 py-10 text-center max-2xl:gap-2 max-2xl:px-44 max-lg:px-14 max-sm:px-0'
    >
      <div className='absolute -left-[10%] top-0 z-20 hidden h-[1px] w-[120%] bg-line-horizontal-dark bg-line-pattern-horizontal line-mask-horizontal dark:block max-sm:opacity-0'></div>
      <div className='absolute -top-[40%] right-0 z-20 hidden h-[180%] w-[1px] bg-line-vertical-dark bg-line-pattern-vertical line-mask-vertical dark:block max-sm:-top-[20%] max-sm:h-[140%] max-sm:opacity-0'></div>
      <div className='absolute -top-[40%] left-0 z-20 hidden h-[180%] w-[1px] bg-line-vertical-dark bg-line-pattern-vertical line-mask-vertical dark:block max-sm:-top-[20%] max-sm:h-[140%] max-sm:opacity-0'></div>
      <div className='absolute -left-[10%] bottom-0 z-20 hidden h-[1px] w-[120%] bg-line-horizontal-dark bg-line-pattern-horizontal line-mask-horizontal dark:block max-sm:opacity-0'></div>
      <div className='absolute -left-[10%] top-0 z-20 h-[1px] w-[120%] bg-line-horizontal-light bg-line-pattern-horizontal line-mask-horizontal dark:hidden max-sm:opacity-0'></div>
      <div className='absolute -top-[40%] right-0 z-20 h-[180%] w-[1px] bg-line-vertical-light bg-line-pattern-vertical line-mask-vertical dark:hidden max-sm:-top-[20%] max-sm:h-[140%] max-sm:opacity-0'></div>
      <div className='absolute -top-[40%] left-0 z-20 h-[180%] w-[1px] bg-line-vertical-light bg-line-pattern-vertical line-mask-vertical dark:hidden max-sm:-top-[20%] max-sm:h-[140%] max-sm:opacity-0'></div>
      <div className='absolute -left-[10%] bottom-0 z-20 h-[1px] w-[120%] bg-line-horizontal-light bg-line-pattern-horizontal line-mask-horizontal dark:hidden max-sm:opacity-0'></div>
      <TextEffect
        trigger={isIntersecting}
        className='font-manrope text-5xl font-bold max-2xl:text-4xl max-xl:text-2xl max-lg:mx-auto max-lg:max-w-[25rem] max-sm:max-w-64 max-sm:text-xl'
        per='char'
        delay={0.5}
        variants={{
          container: {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          },
          item: {
            hidden: { opacity: 0, rotateX: 90, y: 10 },
            visible: {
              opacity: 1,
              rotateX: 0,
              y: 0,
              transition: { duration: 0.2 },
            },
          },
        }}
      >
        Aprenda com Conteúdos Diretos e Objetivos
      </TextEffect>
      <TextEffect
        delay={1.5}
        trigger={isIntersecting}
        per='line'
        as='p'
        segmentWrapperClassName='overflow-hidden block'
        variants={{
          container: {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          },
          item: {
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          },
        }}
        className='text-pretty font-manrope text-lg max-2xl:text-base max-sm:text-sm'
      >
        Explore uma variedade de conteúdos educativos voltados para o desenvolvimento de habilidades
        financeiras. Cada módulo traz informações claras e diretas sobre tópicos essenciais, para que você
        possa aprender sem complicações.
      </TextEffect>
    </div>
  );
};
