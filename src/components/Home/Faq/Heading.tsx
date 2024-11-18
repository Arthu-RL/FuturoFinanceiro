import { TextEffect } from '@/components/ui/text-effect';
import { useIsIntersecting } from '@/hooks/useIsIntersecting';

export const Heading = () => {
  const { ref, isIntersecting } = useIsIntersecting<HTMLDivElement>({
    options: { rootMargin: '0px', threshold: 0 },
  });

  return (
    <div ref={ref} className='z-50 flex flex-col gap-2 text-center max-sm:gap-0'>
      <TextEffect
        trigger={isIntersecting}
        className='font-manrope text-5xl font-bold max-2xl:text-4xl max-xl:text-2xl max-sm:mx-auto max-sm:max-w-56 max-sm:text-xl'
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
        Dúvidas Frequentes
      </TextEffect>
      <TextEffect
        delay={1}
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
        Esclareça suas dúvidas rapidamente.
      </TextEffect>
    </div>
  );
};
