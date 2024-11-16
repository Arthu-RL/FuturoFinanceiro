import { AnimatedGroup } from '@/components/ui/animated-group';
import { Feature } from '@/components/ui/feature';
import { useIsIntersecting } from '@/hooks/useIsIntersecting';
import { Calculator, Calendar, ChartLine, CreditCard, Globe, Layers, Shield, TrendingUp } from 'lucide-react';
import { ContentDialog } from './ContentDialog';

import DebtManagement from '@/assets/logos/svgs/debt-management.svg?react';
import FinancialInterest from '@/assets/logos/svgs/financial-interest.svg?react';
import FinancialPlanning from '@/assets/logos/svgs/financial-planning.svg?react';
import InvestmentTypes from '@/assets/logos/svgs/investment-types.svg?react';
import PortifolioDiversification from '@/assets/logos/svgs/portfolio-diversification.svg?react';
import RiskProfiles from '@/assets/logos/svgs/risk-profiles.svg?react';
import GlobalMarket from '@/assets/logos/svgs/global-market.svg?react';
import EconomicCycles from '@/assets/logos/svgs/economic-cycles.svg?react';

export const ContentCards = () => {
  const cards = [
    {
      Icon: ChartLine,
      Image: InvestmentTypes,
      title: 'Tipos de Investimentos',
      description:
        'Conheça as principais modalidades de investimentos, como ações, renda fixa e fundos, para escolher as melhores opções de acordo com seu perfil financeiro.',
      content: {
        title: 'Tipos de Investimentos',
        subtitle:
          'O universo dos investimentos oferece diversas possibilidades, cada uma com suas vantagens e riscos. Descubra os principais tipos e como eles funcionam:',
        slides: [
          {
            heading: 'Ações',
            text: 'Representam uma fração do capital social de uma empresa. Ao investir em ações, você se torna sócio e pode lucrar com a valorização dos preços e com dividendos. No entanto, o mercado de ações é altamente volátil e exige atenção.',
          },
          {
            heading: 'Renda Fixa',
            text: 'Engloba investimentos como CDBs, Tesouro Direto e debêntures. São opções previsíveis, com rentabilidade fixa ou atrelada a índices econômicos, ideais para quem busca segurança.',
          },
          {
            heading: 'Fundos de Investimento',
            text: 'Permitem o acesso a um portfólio diversificado gerido por especialistas. Há fundos para todos os perfis, como fundos de ações, multimercados e de renda fixa.',
          },
          {
            heading: 'Poupança',
            text: 'Conhecida por sua simplicidade e segurança, a poupança oferece liquidez imediata, mas uma rentabilidade geralmente inferior a outras opções de investimento.',
          },
        ],
      },
    },
    {
      Icon: Shield,
      Image: RiskProfiles,
      title: 'Perfis de Risco',
      description:
        'Identifique seu perfil de risco — conservador, moderado ou agressivo — para tomar decisões financeiras alinhadas às suas expectativas e objetivos.',
      content: {
        title: 'Perfis de Risco',
        subtitle:
          'Entender seu perfil de risco é essencial para escolher os investimentos mais adequados. Veja as principais características de cada perfil:',
        slides: [
          {
            heading: 'Conservador',
            text: 'Indicado para quem prioriza segurança e prefere evitar perdas. Investimentos como Tesouro Direto e CDBs são os mais procurados por esse perfil.',
          },
          {
            heading: 'Moderado',
            text: 'Ideal para quem busca um equilíbrio entre segurança e retorno. Combina renda fixa com renda variável para diversificar os ganhos.',
          },
          {
            heading: 'Agressivo',
            text: 'Focado em maximizar lucros, mesmo com alto risco. Investe em ações, fundos multimercados e outros ativos mais voláteis.',
          },
        ],
      },
    },
    {
      Icon: Calendar,
      Image: FinancialPlanning,
      title: 'Planejamento Financeiro',
      description:
        'Descubra como organizar suas finanças, estabelecer metas e alcançar seus objetivos financeiros com estratégias práticas.',
      content: {
        title: 'Planejamento Financeiro',
        subtitle:
          'Planejar suas finanças é o primeiro passo para realizar sonhos e conquistar segurança financeira. Confira como começar:',
        slides: [
          {
            heading: 'Defina Metas Financeiras',
            text: 'Estabeleça objetivos específicos, como comprar um imóvel, economizar para a aposentadoria ou fazer uma viagem. Planeje metas de curto, médio e longo prazo.',
          },
          {
            heading: 'Organize Suas Finanças',
            text: 'Acompanhe seus gastos e receitas mensalmente. Identifique despesas desnecessárias e redirecione esse dinheiro para investimentos ou economias.',
          },
          {
            heading: 'Crie um Orçamento',
            text: 'Use métodos como o 50-30-20 (50% para necessidades, 30% para desejos e 20% para poupança/investimentos) para equilibrar seu orçamento.',
          },
          {
            heading: 'Monte uma Reserva de Emergência',
            text: 'Economize o equivalente a 3-6 meses de suas despesas mensais. Isso garante segurança em momentos de imprevistos.',
          },
        ],
      },
    },
    {
      Icon: CreditCard,
      Image: DebtManagement,
      title: 'Gestão de Dívidas',
      description:
        'Aprenda estratégias para lidar com dívidas, evitar atrasos e retomar o controle das suas finanças.',
      content: {
        title: 'Gestão de Dívidas',
        subtitle:
          'Ter dívidas não precisa ser um problema, desde que elas sejam bem administradas. Veja como gerenciar de forma eficaz:',
        slides: [
          {
            heading: 'Priorize Dívidas com Juros Altos',
            text: 'Comece pelas dívidas com as maiores taxas de juros, como cartão de crédito e cheque especial, para evitar que elas aumentem rapidamente.',
          },
          {
            heading: 'Negocie com Credores',
            text: 'Busque melhores condições de pagamento, como redução de juros ou prazos mais flexíveis.',
          },
          {
            heading: 'Evite Novas Dívidas',
            text: 'Adote um consumo consciente e priorize pagar as dívidas existentes antes de assumir novas obrigações.',
          },
          {
            heading: 'Crie um Plano de Pagamento',
            text: 'Liste todas as suas dívidas, organize-as por prioridade e defina prazos realistas para quitá-las.',
          },
        ],
      },
    },
    {
      Icon: Calculator,
      Image: FinancialInterest,
      title: 'Juros Financeiros',
      description:
        'Compreenda o impacto dos juros, tanto em empréstimos quanto em investimentos, e aprenda a usá-los de forma inteligente.',
      content: {
        title: 'Juros Financeiros',
        subtitle:
          'Os juros são determinantes no custo de empréstimos e na rentabilidade de investimentos. Entenda os diferentes tipos e como usá-los:',
        slides: [
          {
            heading: 'Juros Simples',
            text: 'São calculados apenas sobre o valor inicial. São comuns em prazos curtos e oferecem maior previsibilidade.',
          },
          {
            heading: 'Juros Compostos',
            text: 'Incidem sobre o valor inicial e os juros acumulados. São vantajosos em investimentos de longo prazo, mas perigosos em dívidas prolongadas.',
          },
          {
            heading: 'Juros em Empréstimos',
            text: 'Taxas altas podem encarecer significativamente o valor final. Compare condições antes de fechar contratos.',
          },
          {
            heading: 'Juros nos Investimentos',
            text: 'Com o tempo, os juros compostos potencializam os ganhos, acelerando o crescimento do patrimônio.',
          },
        ],
      },
    },
    {
      Icon: Layers,
      Image: PortifolioDiversification,
      title: 'Diversificação de Portfólio',
      description:
        'Aprenda a diversificar seus investimentos para minimizar riscos e otimizar seus resultados.',
      content: {
        title: 'Diversificação de Portfólio',
        subtitle:
          'A diversificação é essencial para reduzir riscos e maximizar ganhos. Descubra como aplicar essa estratégia:',
        slides: [
          {
            heading: 'Redução de Riscos',
            text: 'Distribua seus recursos entre diferentes tipos de ativos para minimizar impactos de perdas em um setor específico.',
          },
          {
            heading: 'Equilíbrio no Portfólio',
            text: 'Compense eventuais perdas em um investimento com os ganhos de outro, garantindo estabilidade.',
          },
          {
            heading: 'Exploração de Oportunidades',
            text: 'Invista em mercados variados para aproveitar o potencial de diferentes setores.',
          },
          {
            heading: 'Exemplo de Estratégia',
            text: 'Combine ações de diferentes setores com ativos de renda fixa para construir um portfólio sólido e diversificado.',
          },
        ],
      },
    },
    {
      Icon: Globe,
      Image: GlobalMarket,
      title: 'Mercados Globais',
      description:
        'Explore como os mercados internacionais funcionam e como eles podem influenciar suas decisões de investimento.',
      content: {
        title: 'Mercados Globais',
        subtitle:
          'Os mercados internacionais oferecem oportunidades e desafios únicos. Descubra os principais aspectos que os tornam importantes:',
        slides: [
          {
            heading: 'Ações Internacionais',
            text: 'Investir em empresas estrangeiras permite diversificar o portfólio e acessar mercados em crescimento, como tecnologia nos EUA ou consumo na Ásia.',
          },
          {
            heading: 'Taxas de Câmbio',
            text: 'Flutuações cambiais podem impactar o retorno dos investimentos internacionais, sendo importante monitorar o dólar, euro e outras moedas.',
          },
          {
            heading: 'Riscos Geopolíticos',
            text: 'Eventos como mudanças políticas, guerras ou tensões econômicas podem influenciar negativamente os mercados globais.',
          },
          {
            heading: 'Tendências de Mercado',
            text: 'Acompanhar inovações e setores em alta globalmente, como energia limpa e inteligência artificial, pode trazer vantagens estratégicas.',
          },
        ],
      },
    },
    {
      Icon: TrendingUp,
      Image: EconomicCycles,
      title: 'Ciclos Econômicos',
      description:
        'Compreenda os ciclos econômicos e como eles afetam o mercado, ajudando você a ajustar sua estratégia de investimentos.',
      content: {
        title: 'Ciclos Econômicos',
        subtitle:
          'Os mercados passam por fases distintas que impactam investimentos. Conheça os estágios dos ciclos econômicos:',
        slides: [
          {
            heading: 'Expansão',
            text: 'Fase de crescimento econômico, com aumento no consumo, geração de empregos e valorização de ativos.',
          },
          {
            heading: 'Pico',
            text: 'Momento de maior aquecimento econômico, geralmente seguido de um ajuste ou desaceleração.',
          },
          {
            heading: 'Recessão',
            text: 'Período de contração econômica, em que os mercados tendem a apresentar quedas e maior volatilidade.',
          },
          {
            heading: 'Recuperação',
            text: 'A economia começa a se estabilizar e retomar o crescimento, criando oportunidades de investimento.',
          },
        ],
      },
    },
  ];

  const { ref, isIntersecting } = useIsIntersecting<HTMLDivElement>({
    options: { rootMargin: '-100px', threshold: 0 },
  });

  return (
    <div ref={ref} className='relative w-full'>
      <div className='absolute -left-[10%] top-0 z-20 hidden h-[1px] w-[120%] bg-line-horizontal-dark bg-line-pattern-horizontal line-mask-horizontal dark:block max-sm:opacity-0'></div>
      <div className='absolute -left-[10%] top-0 z-20 h-[1px] w-[120%] bg-line-horizontal-light bg-line-pattern-horizontal line-mask-horizontal dark:hidden max-sm:opacity-0'></div>
      <div className='absolute -left-[10%] bottom-0 z-20 hidden h-[1px] w-[120%] bg-line-horizontal-dark bg-line-pattern-horizontal line-mask-horizontal dark:block max-sm:opacity-0'></div>
      <div className='absolute -left-[10%] bottom-0 z-20 h-[1px] w-[120%] bg-line-horizontal-light bg-line-pattern-horizontal line-mask-horizontal dark:hidden max-sm:opacity-0'></div>
      <AnimatedGroup
        trigger={isIntersecting}
        className='relative z-10 mx-auto grid auto-rows-fr grid-cols-1 max-sm:auto-rows-auto max-sm:gap-6 md:grid-cols-2 lg:grid-cols-4'
        variants={{
          container: { visible: { transition: { staggerChildren: 0.05 } } },
          item: {
            hidden: { opacity: 0, filter: 'blur(12px)', y: -60, rotateX: 90 },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              rotateX: 0,
              transition: { type: 'spring', bounce: 0.3, duration: 1 },
            },
          },
        }}
      >
        {cards.map((feature, index) => (
          <ContentDialog
            modalParam={String(index)}
            key={feature.title}
            Icon={feature.Icon}
            Image={feature.Image}
            title={feature.content.title}
            slides={feature.content.slides}
            subtitle={feature.content.subtitle}
          >
            <Feature {...feature} index={index} />
          </ContentDialog>
        ))}
      </AnimatedGroup>
    </div>
  );
};
