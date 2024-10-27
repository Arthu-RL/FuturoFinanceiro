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
      title: 'Próxima atualização',
      attachTo: { element: '#refresh', on: 'bottom-end' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Este é o temporizador que indica quanto falta para a próxima atualização do mercado. Os preços são atualizados a cada minuto.',
    });

    tour.addStep({
      title: 'Saldo',
      attachTo: { element: '#balance', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Aqui está o saldo atual da sua conta.',
    });

    tour.addStep({
      title: 'Patrimônio em ativos',
      attachTo: { element: '#holdings', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'O valor total que você tem investido em ativos no momento.',
    });

    tour.addStep({
      title: 'Rentabilidade total',
      attachTo: { element: '#profitability', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'O lucro ou prejuízo acumulado com a venda de ativos. Pode ser um valor positivo ou negativo.',
    });

    tour.addStep({
      title: 'Rentabilidade semanal',
      attachTo: { element: '#weekly-profitability', on: 'bottom-end' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'O lucro ou prejuízo das vendas realizadas na semana atual, com um resumo por dia.',
    });

    tour.addStep({
      title: 'Busca',
      attachTo: { element: '#search', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Use este campo para buscar um ativo pelo nome.',
    });

    tour.addStep({
      title: 'Filtros',
      attachTo: { element: '#filter', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Aqui você pode filtrar ativos por risco, categoria e visualizar apenas aqueles que estão na sua carteira. Para acompanhar seus investimentos, ative “Filtrar por meus ativos”.',
    });

    tour.addStep({
      title: 'Ativos',
      attachTo: { element: '#assets', on: 'top' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Informações detalhadas sobre cada ativo, como nome, categoria, perfil de risco, variação, preço, código, e mais. É possível ordenar por diferentes colunas.',
    });

    tour.addStep({
      title: 'Ações',
      attachTo: { element: '#actions', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Clique em “...” para acessar opções como comprar, vender se você já possui o ativo, e visualizar detalhes. Nos detalhes, veja histórico de preços, volatilidade, tendências e mais.',
    });

    tour.addStep({
      title: 'Histórico',
      attachTo: { element: '#history', on: 'bottom' },
      buttons: [{ text: 'Próximo', action: tour.next }],
      text: 'Registro das suas atividades financeiras, incluindo todas as compras e vendas de ativos.',
    });

    tour.addStep({
      title: 'Tutorial Concluído!',
      buttons: [{ text: 'Fechar', action: handleEndTutorial }],
      text: 'Parabéns! Você finalizou o tutorial do simulador de investimentos. Agora você está pronto para explorar todas as funcionalidades disponíveis. Caso queira ver o tutorial novamente, clique em “Guia do Simulador” na barra de navegação.',
    });

    tour.start();
    return () => tour.complete();
  }, [pathname, tutorialWindowState, updateTutorialModalState]);

  return { isTutorialActive, updateTutorialModalState };
};
