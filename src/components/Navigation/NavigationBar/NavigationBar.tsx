import { NavigationLinks } from './NavigationLinks';
import { Gamepad, Link, TrendingUp } from 'lucide-react';
import { NavigationLogo } from './NavigationLogo';
import { ThemeButton } from '../ThemeButton';
import { NavigationContent } from './NavigationContent';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTutorial } from '@/providers/tutorialProvider';
import { Fragment, useEffect, useState } from 'react';
import { AchievementsModal } from '../../Simulator/Modal/AchievementsModal';
import { ExternalLinkModal } from '../ExternalLinkModal';
import { ExternalLink } from '@/@types/link';
import { scrollToHash } from '@/utils/navigation';

export const NavigationBar = () => {
  const [isAchievementModalActive, setIsAchievementModalActive] = useState(false);
  const [externalLink, setExternalLink] = useState<ExternalLink>(null);
  const [activeHash, setActiveHash] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { updateTutorialModalState } = useTutorial();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleOpenModal(index: number) {
    const params = new URLSearchParams({ modal: String(index) });

    if (pathname === '/') {
      setSearchParams(params);
    } else navigate(`/?${params}`);
  }

  useEffect(() => {
    const modal = searchParams.get('modal');
    if (modal) scrollToHash('#content');
  }, [searchParams]);

  function navigateToHash(path: string, hash: string) {
    navigate(path);
    setActiveHash(hash);
  }

  useEffect(() => {
    if (!activeHash) return;
    scrollToHash(activeHash);
    setActiveHash(null);
  }, [activeHash]);

  const investmentLinks = [
    { title: 'Tipos de Investimentos', href: () => handleOpenModal(0) },
    { title: 'Perfis de Risco', href: () => handleOpenModal(1) },
    { title: 'Planejamento Financeiro', href: () => handleOpenModal(2) },
    { title: 'Gestão de Dívidas', href: () => handleOpenModal(3) },
    { title: 'Juros Financeiros', href: () => handleOpenModal(4) },
    { title: 'Diversificação de Portfólio', href: () => handleOpenModal(5) },
    { title: 'Mercados Globais', href: () => handleOpenModal(6) },
    { title: 'Ciclos Econômicos', href: () => handleOpenModal(7) },
  ];

  const simulatorLinks = [
    { title: 'Simulador de Investimentos', href: '/simulador' },
    {
      title: 'Guia do Simulador',
      href: () => {
        updateTutorialModalState?.(true);
        navigate('/simulador');
      },
    },
  ];

  const achievementsLinks = [
    { title: 'Mostrar Meu Progresso', href: () => setIsAchievementModalActive(true) },
  ];

  const additionalLinks = [
    {
      title: 'Tesouro Direto',
      href: () => setExternalLink({ title: 'Tesouro Direto', href: 'https://www.tesourodireto.com.br' }),
    },
    {
      title: 'BM&FBovespa',
      href: () => setExternalLink({ title: 'BM&FBovespa', href: 'https://www.b3.com.br' }),
    },
    {
      title: 'Banco Central',
      href: () => setExternalLink({ title: 'Banco Central', href: 'https://www.bcb.gov.br/' }),
    },
    {
      title: 'InfoMoney',
      href: () => setExternalLink({ title: 'InfoMoney', href: 'https://www.infomoney.com.br' }),
    },
    {
      title: 'Valor Econômico',
      href: () => setExternalLink({ title: 'Valor Econômico', href: 'https://valor.globo.com' }),
    },
  ];

  const profileTestLinks = [
    {
      title: 'Iniciar Avaliação Sicredi',
      href: () =>
        setExternalLink({
          title: 'Sicredi',
          href: 'https://sicredipioneira.com.br/educacao-financeira/teste',
        }),
    },
  ];

  const navigation = [
    {
      Icon: TrendingUp,
      sections: [
        { heading: 'Futuro Financeiro', links: investmentLinks },
        {
          heading: 'Sobre a Plataforma',
          links: [{ title: 'Entenda o Futuro Financeiro', href: () => navigateToHash('/', '#about') }],
        },
        {
          heading: 'Dúvidas Comuns',
          links: [{ title: 'Veja as Respostas', href: () => navigateToHash('/', '#faq') }],
        },
      ],
    },
    {
      Icon: Gamepad,
      sections: [
        { heading: 'Simulador', links: simulatorLinks },
        { heading: 'Minhas Conquistas', links: achievementsLinks },
      ],
    },
    {
      Icon: Link,
      sections: [
        { heading: 'Descubra Seu Perfil', links: profileTestLinks },
        { heading: 'Recursos Externos', links: additionalLinks },
      ],
    },
  ];

  return (
    <Fragment>
      <ExternalLinkModal link={externalLink} />
      <AchievementsModal
        modalState={{ currentState: isAchievementModalActive, setState: setIsAchievementModalActive }}
      />
      <header className='fixed left-0 top-0 z-[999] h-screen bg-stone-900 px-2.5 py-4 max-sm:h-fit max-sm:w-full max-sm:px-3.5 max-sm:py-1.5'>
        <div className='container mx-auto flex h-full max-w-screen-2xl flex-col items-center gap-2 max-sm:flex-row'>
          <NavigationLogo />
          {navigation.map(({ sections, Icon }, index) => {
            return (
              <NavigationLinks key={index} Icon={Icon}>
                {sections.map(({ heading, links }) => (
                  <NavigationContent key={heading} heading={heading} links={links} />
                ))}
              </NavigationLinks>
            );
          })}
          <ThemeButton />
        </div>
      </header>
    </Fragment>
  );
};
