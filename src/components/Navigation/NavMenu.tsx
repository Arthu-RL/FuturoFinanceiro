import { Link } from 'react-router-dom';
import { ChartColumnDecreasing } from 'lucide-react';
import { NavMenuItem } from './NavMenuItem';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const options = [
  {
    title: 'Ações e Títulos',
    href: '/acoes-titulos',
    description: 'Investimentos como ações que podem ter altos retornos, mas com maior risco.',
  },
  {
    title: 'Títulos de Renda Fixa',
    href: '/titulos-de-renda-fixa',
    description: 'Investimentos como títulos públicos ou corporativos que pagam juros fixos.',
  },
  {
    title: 'Imóveis',
    href: '/imoveis',
    description: 'Investimentos em propriedades residenciais, comerciais ou terrenos.',
  },
  {
    title: 'Fundos de Investimento',
    href: '/fundos-de-investimento',
    description:
      'Veículos que reúnem recursos de vários investidores para investir em uma variedade de ativos.',
  },
  {
    title: 'Commodities',
    href: '/commodities',
    description: 'Bens físicos como ouro, prata, petróleo e produtos agrícolas.',
  },
  {
    title: 'Moedas Físicas',
    href: '/moedas-fisicas',
    description: 'Dinheiro físico, como notas e moedas, usado no dia a dia.',
  },
];

export const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Introdução</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li className='row-span-3'>
                <NavigationMenuLink asChild>
                  <Link
                    to='/'
                    className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                  >
                    <ChartColumnDecreasing className='h-6 w-6' />
                    <div className='mb-2 mt-4 text-lg font-medium leading-tight'>
                      Simulador de Investimentos
                    </div>
                    <p className='text-sm leading-tight text-muted-foreground'>
                      Ferramenta interativa para testar e visualizar diferentes cenários de investimento,
                      ajudando a tomar decisões informadas.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <NavMenuItem href='/risco-baixo' title='Investimento de Risco Baixo'>
                Gestão segura e conservadora com menor risco.
              </NavMenuItem>
              <NavMenuItem href='/risco-medio' title='Investimento de Risco Médio'>
                Estratégias com risco moderado e retorno equilibrado.
              </NavMenuItem>
              <NavMenuItem href='/risco-alto' title='Investimento de Risco Alto'>
                Investimentos com alto potencial e maior risco.
              </NavMenuItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tipos de Investimentos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
              {options.map(({ href, title, description }) => (
                <NavMenuItem key={title} href={href} title={title}>
                  {description}
                </NavMenuItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to='/simulador'>Experimente o Mercado</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
