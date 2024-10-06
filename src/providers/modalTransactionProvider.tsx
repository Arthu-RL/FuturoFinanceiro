import { createContext, useContext, useState } from 'react';

type ModalProviderState = {
  isModalOpen: boolean;
  openModal(): void;
  closeModal(): void;
};

const TransactionModalContext = createContext<ModalProviderState>({
  isModalOpen: false,
  openModal: () => null,
  closeModal: () => null,
});

function TransactionModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <TransactionModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </TransactionModalContext.Provider>
  );
}

const useTransactionModal = () => {
  const context = useContext(TransactionModalContext);
  if (!context) throw new Error('useTransactionModal must be used within a TransactionModalProvider');
  return context;
};

export { TransactionModalProvider, useTransactionModal };
