import 'shepherd.js/dist/css/shepherd.css';
import Shepherd from 'shepherd.js';

import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Tutorial, tutorialSchema } from '@/lib/schemas/tutorial.schema';
import { useLocation } from 'react-router-dom';

export const useTutorialModal = () => {
  const { setStorageItem, getStorageItem } = useLocalStorage<Tutorial>(tutorialSchema);
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const { pathname } = useLocation();

  const tutorialWindowState = getStorageItem('tutorial-window')?.isTutorialWindowActive;

  const updateTutorialModalState = useCallback(
    (state: boolean) => setStorageItem('tutorial-window', { isTutorialWindowActive: state }),
    [setStorageItem],
  );

  useEffect(() => {
    if (pathname !== '/simulador' || tutorialWindowState === false) return;
    setIsTutorialActive(true);

    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: { arrow: false, scrollTo: { behavior: 'smooth', block: 'center' } },
    });

    function handleEndTutorial() {
      tour.complete();
      updateTutorialModalState(false);
      setIsTutorialActive(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    tour.addStep({
      title: 'Bem-vindo ao Simulador de Investimentos!',
      buttons: [
        { text: 'Não', action: handleEndTutorial },
        { text: 'Sim', action: tour.next },
      ],
      text: 'Deseja iniciar um breve tutorial para conhecer as principais funcionalidades do simulador? Você pode aprender a usar todas as ferramentas disponíveis e começar a investir com confiança. Se preferir, poderá acessar o tutorial mais tarde clicando em “Guia do Simulador” na barra de navegação.',
    });

    tour.addStep({
      title: 'Visão Geral da Página',
      attachTo: { element: '#simulator' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Esta é a página principal do simulador, onde você pode ver informações como saldo, patrimônio em ativos, e rentabilidade. Aqui você pode acompanhar suas finanças e tomar decisões de investimento.',
    });

    tour.addStep({
      title: 'Próxima Atualização',
      attachTo: { element: '#refresh', on: 'bottom-end' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Este é o temporizador que indica quanto tempo falta para a próxima atualização do mercado. Os preços são atualizados a cada minuto, permitindo que você acompanhe as flutuações em tempo real e tome decisões estratégicas.',
    });

    tour.addStep({
      title: 'Saldo',
      attachTo: { element: '#balance', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Aqui está o saldo atual da sua conta. O saldo é atualizado automaticamente após cada compra ou venda de ativos.',
    });

    tour.addStep({
      title: 'Patrimônio em ativos',
      attachTo: { element: '#holdings', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Este é o valor total que você tem investido em ativos no momento. Reflete o total investido e o desempenho acumulado desses ativos.',
    });

    tour.addStep({
      title: 'Rentabilidade total',
      attachTo: { element: '#profitability', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Resultado acumulado das vendas de ativos, refletindo o saldo final como lucro ou prejuízo. Essa métrica oferece uma visão clara da performance financeira geral dos seus investimentos ao longo do tempo.',
    });

    tour.addStep({
      title: 'Rentabilidade Semanal',
      attachTo: { element: '#weekly-profitability', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'A rentabilidade semanal mostra o lucro ou prejuízo acumulado com as vendas realizadas na semana atual, detalhado por dia. Isso ajuda a entender o desempenho recente dos seus investimentos.',
    });

    tour.addStep({
      title: 'Busca',
      attachTo: { element: '#search', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Use este campo para buscar um ativo pelo nome. Isso facilita encontrar rapidamente um ativo específico em sua lista.',
    });

    tour.addStep({
      title: 'Filtros',
      attachTo: { element: '#filter', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Aqui você pode filtrar ativos por risco, categoria, e visualizar apenas aqueles que estão na sua carteira. Para acompanhar seus investimentos de forma mais eficiente, ative “Filtrar por meus ativos”. Use os filtros para explorar opções de investimento que se adequem ao seu perfil.',
    });

    tour.addStep({
      title: 'Ativos Disponíveis',
      attachTo: { element: '#assets', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Dados completos sobre cada ativo, incluindo nome, categoria, perfil de risco, variação de preço, valor atual, código, entre outras informações relevantes. As colunas podem ser ordenadas para facilitar a análise e comparação dos ativos.',
    });

    tour.addStep({
      title: 'Ações',
      attachTo: { element: '#actions', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Clique em “...” para acessar opções como comprar, vender se você já possui o ativo, e visualizar detalhes. Nos detalhes, veja histórico de preços, volatilidade, tendências e mais. Essas opções são fundamentais para gerenciar seu portfólio de forma eficaz.',
    });

    tour.addStep({
      title: 'Atividades Financeiras',
      attachTo: { element: '#history', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Veja o histórico das suas transações, incluindo compras e vendas de ativos. Acompanhe cada atividade financeira e analise seu desempenho ao longo do tempo.',
    });

    tour.addStep({
      title: 'Tutorial Concluído!',
      buttons: [{ text: 'Fechar', action: handleEndTutorial }],
      text: 'Parabéns! Você finalizou o tutorial do simulador de investimentos. Agora você está pronto para explorar todas as funcionalidades disponíveis. Caso queira ver o tutorial novamente, clique em “Guia do Simulador” na barra de navegação. Explore as outras seções para maximizar seu aprendizado e aproveitar todas as ferramentas disponíveis.',
    });

    tour.start();
    return () => tour.complete();
  }, [pathname, tutorialWindowState, updateTutorialModalState]);

  return { isTutorialActive, updateTutorialModalState };
};
