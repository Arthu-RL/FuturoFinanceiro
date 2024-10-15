import { NavigationLinks } from './NavigationLinks';
import { Gamepad, Link, TrendingUp } from 'lucide-react';
import { NavigationLogo } from './NavigationLogo';
import { ThemeButton } from './ThemeButton';

const investmentLinks = [
  { title: 'Ações e Títulos', href: '/investimentos/acoes-titulos' },
  { title: 'Renda Fixa', href: '/investimentos/renda-fixa' },
  { title: 'Imóveis Físicos', href: '/investimentos/imoveis' },
  { title: 'Fundos Imobiliários (FIIs)', href: '/investimentos/fundos-imobiliarios' },
  { title: 'Fundos de Investimento', href: '/investimentos/fundos' },
  { title: 'Commodities', href: '/investimentos/commodities' },
  { title: 'Moedas Estrangeiras', href: '/investimentos/moedas-estrangeiras' },
  { title: 'Criptomoedas', href: '/investimentos/criptomoedas' },
];

const simulatorLinks = [
  { title: 'Simulador de Investimentos', href: '/simulador' },
  { title: 'Guia do Simulador', href: '/simulador/guia' },
];

const additionalLinks = [
  { title: 'Tesouro Direto', href: 'https://www.tesourodireto.com.br' },
  { title: 'BM&FBovespa', href: 'https://www.b3.com.br' },
  { title: 'Banco Central', href: 'https://www.bcb.gov.br/' },
  { title: 'InfoMoney', href: 'https://www.infomoney.com.br' },
  { title: 'Valor Econômico', href: 'https://valor.globo.com' },
];

const links = [
  { title: 'Investimentos', Icon: TrendingUp, links: investmentLinks },
  { title: 'Simulador', Icon: Gamepad, links: simulatorLinks },
  { title: 'Recursos Externos', Icon: Link, links: additionalLinks },
];

export const NavigationBar = () => {
  return (
    <header className='fixed left-0 top-0 z-[999] h-screen bg-stone-900 px-2.5 py-4 max-sm:h-fit max-sm:w-full max-sm:px-3.5 max-sm:py-1.5'>
      <div className='container mx-auto flex h-full max-w-screen-2xl flex-col items-center gap-2 max-sm:flex-row'>
        <NavigationLogo />
        {links.map((navigationContent) => (
          <NavigationLinks key={navigationContent.title} {...navigationContent} />
        ))}
        <ThemeButton />
      </div>
    </header>
  );
};
