import { Button } from '@/components/ui/button';
import { FlipWords } from '@/components/ui/flip-words';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { scrollToHash } from '@/utils/navigation';
import { useNavigate } from 'react-router-dom';

export const HeroHeading = () => {
  const words = [
    'dinâmica',
    'intuitiva',
    'prática',
    'divertida',
    'inovadora',
    'eficaz',
    'empolgante',
    'engajadora',
    'realista',
    'gratificante',
    'inteligente',
  ];

  const navigate = useNavigate();

  return (
    <div className='z-10 mt-10 flex flex-col gap-6 max-2xl:mt-36 max-xl:mt-3 max-xl:gap-2'>
      <span className='font-manrope text-6xl font-bold max-2xl:text-5xl max-xl:text-3xl xl:-mb-4'>
        Futuro Financeiro
      </span>
      <div className='flex flex-col gap-2'>
        <div className='w-full text-4xl font-normal max-2xl:text-3xl max-xl:text-xl max-xl:leading-6'>
          <span className='text-foreground'>Aprenda de maneira</span>
          <FlipWords words={words} />
          <br />
          <p className='max-w-96'>e conquiste suas metas financeiras</p>
        </div>
        <p className='my-2 max-w-xl font-manrope max-2xl:max-w-md max-xl:mb-8 max-xl:mt-4 max-xl:text-sm'>
          Bem-vindo ao Futuro Financeiro, uma plataforma interativa projetada para jovens que querem aprender
          sobre finanças e investimentos de maneira prática. Aqui, você encontrará um ambiente seguro para
          desenvolver habilidades financeiras essenciais e se preparar para tomar decisões inteligentes no
          futuro.
        </p>
      </div>
      <div className='flex gap-2 max-xl:text-sm'>
        <Button onClick={() => scrollToHash('#about')} className='h-11 max-xl:h-auto' variant='outline'>
          Saiba Mais
        </Button>
        <div className='flex justify-center text-center'>
          <HoverBorderGradient
            as='button'
            containerClassName='rounded-sm'
            onClick={() => navigate('/simulador')}
            className='flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white'
          >
            <span>Experimente o Simulador</span>
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
};
