import { AnimatedGroup } from '@/components/ui/animated-group';
import { useIsIntersecting } from '@/hooks/useIsIntersecting';
import { BookText, DollarSign, Plus, Trophy } from 'lucide-react';

export const AboutUsCards = () => {
  const { ref, isIntersecting } = useIsIntersecting<HTMLDivElement>({
    options: { threshold: 0, rootMargin: '-150px' },
  });

  return (
    <div ref={ref}>
      <AnimatedGroup
        className='z-10 grid grid-cols-3 max-xl:grid-cols-1'
        trigger={isIntersecting}
        variants={{
          container: {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          },
          item: {
            hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 1.2, type: 'spring', bounce: 0.3 },
            },
          },
        }}
      >
        <div className='relative flex h-full flex-col gap-2 overflow-hidden border-[0.2px] border-muted-foreground/50 p-10 max-sm:p-6'>
          <Plus className='absolute -bottom-3 -left-3 stroke-muted-foreground/75' />
          <Plus className='absolute -bottom-3 -right-3 stroke-muted-foreground/75' />
          <Plus className='absolute -left-3 -top-3 stroke-muted-foreground/75' />
          <Plus className='absolute -right-3 -top-3 stroke-muted-foreground/75' />
          <div className='flex items-center gap-2'>
            <DollarSign className='size-4 stroke-muted-foreground' />
            <span className='text-muted-foreground'>Invista sem riscos</span>
          </div>
          <span className='text-2xl max-2xl:text-xl'>
            Simulação de <b>Investimentos</b>
          </span>
          <p className='text-sm text-muted-foreground'>
            Experimente como é investir em um ambiente sem riscos, simulando cenários do mundo real e tomando
            decisões financeiras com base em dados.
          </p>
        </div>
        <div className='relative flex h-full flex-col gap-2 overflow-hidden border-[0.2px] border-l-0 border-r-0 border-muted-foreground/50 p-10 max-xl:border-l-[0.2px] max-xl:border-r-[0.2px] max-sm:p-6'>
          <Plus className='absolute -bottom-3 -left-3 stroke-muted-foreground/75' />
          <Plus className='absolute -bottom-3 -right-3 stroke-muted-foreground/75' />
          <Plus className='absolute -left-3 -top-3 stroke-muted-foreground/75' />
          <Plus className='absolute -right-3 -top-3 stroke-muted-foreground/75' />
          <div className='flex items-center gap-2'>
            <BookText className='size-4 stroke-muted-foreground' />
            <span className='text-muted-foreground'>Aprenda com facilidade</span>
          </div>
          <span className='text-2xl max-2xl:text-xl'>
            Conteúdo <b>Didático</b>
          </span>
          <p className='text-sm text-muted-foreground'>
            Acesse materiais educativos diretos e dinâmicos sobre temas como tipos de investimentos e gestão
            financeira.
          </p>
        </div>
        <div className='relative flex h-full flex-col gap-2 overflow-hidden border-[0.2px] border-muted-foreground/50 p-10 max-sm:p-6'>
          <Plus className='absolute -bottom-3 -left-3 stroke-muted-foreground/75' />
          <Plus className='absolute -bottom-3 -right-3 stroke-muted-foreground/75' />
          <Plus className='absolute -left-3 -top-3 stroke-muted-foreground/75' />
          <Plus className='absolute -right-3 -top-3 stroke-muted-foreground/75' />
          <div className='flex items-center gap-2'>
            <Trophy className='size-4 stroke-muted-foreground' />
            <span className='text-muted-foreground'>Acompanhe seu progresso</span>
          </div>
          <span className='text-2xl max-2xl:text-xl'>
            Metas e <b className=' '>Conquistas</b>
          </span>
          <p className='text-sm text-muted-foreground'>
            Estabeleça metas, participe de desafios e acompanhe suas conquistas para ver seu progresso ao
            longo da jornada de aprendizado.
          </p>
        </div>
      </AnimatedGroup>
    </div>
  );
};
