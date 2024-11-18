import { Minus } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export const Questions = () => {
  const questions = [
    {
      question: 'Para quem é essa plataforma?',
      answer:
        'Essa plataforma é ideal para jovens que querem aprender sobre finanças e investimentos de maneira prática.',
    },
    {
      question: 'O que vou aprender na plataforma?',
      answer:
        'Na plataforma, você aprenderá conceitos essenciais de finanças, como tipos de investimentos, planejamento financeiro, diversificação de portfólio e estratégias para gerenciar riscos.',
    },
    {
      question: 'É seguro simular investimentos aqui?',
      answer: 'Sim, todas as simulações são educacionais e não envolvem dinheiro real.',
    },
    {
      question: 'Preciso de algum conhecimento prévio?',
      answer:
        'Não, a plataforma foi desenvolvida para ser acessível a todos, independentemente do nível de conhecimento.',
    },
    {
      question: 'Como funciona a simulação de investimentos?',
      answer:
        'A simulação permite que você experimente investir sem riscos reais, com base em dados e cenários fictícios.',
    },
    {
      question: 'Onde posso aprender a utilizar o simulador?',
      answer:
        'Você pode acessar o tutorial clicando em  “Guia do Simulador” na barra de navegação da plataforma.',
    },
    {
      question: 'Como posso saber o meu perfil de investimento?',
      answer:
        'Você pode realizar um teste para identificar seu perfil de investimento acessando a área de “Recursos Externos”, localizada na barra de navegação da plataforma.',
    },
  ];

  return (
    <Accordion
      className='mx-auto flex w-full max-w-[70%] flex-col gap-4 max-2xl:max-w-[80%] max-sm:max-w-full max-sm:gap-2'
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {questions.map(({ question, answer }) => (
        <AccordionItem
          key={question}
          value={question}
          className='flex flex-col rounded-md border bg-neutral-100 px-3 py-2 backdrop-blur-[1px] dark:bg-neutral-900/35'
        >
          <AccordionTrigger className='w-full py-0.5 text-left text-card-foreground'>
            <div className='relative flex items-center'>
              <div className='flex items-center justify-center rounded-full bg-neutral-300 p-4 dark:bg-accent max-sm:p-3.5'>
                <Minus className='absolute size-4 -rotate-90 stroke-foreground transition-transform duration-200 group-data-[expanded]:rotate-0' />
                <Minus className='absolute size-4 stroke-foreground' />
              </div>
              <p className='ml-4 text-xl text-card-foreground max-sm:ml-3 max-sm:text-sm'>{question}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className='ml-6 pl-6 pr-2 text-muted-foreground max-sm:ml-4 max-sm:text-xs'>{answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
