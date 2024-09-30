import { useContext } from "react";
import { TransactionModalContext } from "@/providers/providers";
import { ModalProviderState } from "@/@types/TransactionModal";

export function useTransactionModal(): ModalProviderState {
  const context = useContext(TransactionModalContext);
  if (!context) {
    throw new Error('useTransactionModal must be used within a ModalProvider');
  }
  return context;
};