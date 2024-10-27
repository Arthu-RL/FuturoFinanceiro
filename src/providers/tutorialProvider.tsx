import { useTutorialModal } from '@/hooks/useTutorialModal';
import { createContext, ReactNode, useContext } from 'react';

type TutorialState = {
  isTutorialActive: boolean;
  updateTutorialModalState: null | ((state: boolean) => void);
};

const TutorialProviderContext = createContext<TutorialState>({
  isTutorialActive: false,
  updateTutorialModalState: null,
});

const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const { isTutorialActive, updateTutorialModalState } = useTutorialModal();
  return (
    <TutorialProviderContext.Provider value={{ isTutorialActive, updateTutorialModalState }}>
      {children}
    </TutorialProviderContext.Provider>
  );
};

const useTutorial = () => {
  const context = useContext(TutorialProviderContext);
  if (!context) throw new Error('useTutorial must be used within a TutorialProvider');
  return context;
};

export { TutorialProvider, useTutorial };
