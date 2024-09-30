import { useState } from "react";
import { TransactionModalContext } from "./providers";

export function TransactionModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <TransactionModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
    {children}
    </TransactionModalContext.Provider>
  );
};
