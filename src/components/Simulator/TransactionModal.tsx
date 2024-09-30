import { useState } from 'react';
import { useTransactionModal } from '@/hooks/useModalState';
import { useBalance } from '@/hooks/useBalance';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

function TransactionModal(): JSX.Element {
  const { balance, updateBalance } = useBalance();
  const { isModalOpen, openModal, closeModal } = useTransactionModal();
  const [amount, setAmount] = useState<number>(0);

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) setAmount(value);
  }

  function handleBuySell(type: 'buy' | 'sell') {
    if (type === 'sell') {
      const newBalance = balance + amount;
      updateBalance(newBalance);
    } 
    else if (type === 'buy') {
      if (amount > balance) {
        alert('Saldo insuficiente para esta compra!');
      } else {
        const newBalance = balance - amount;
        updateBalance(newBalance);
      }
    }

    closeModal();
  }

  return (
    <div className='mt-5'>
      <Dialog open={isModalOpen} onOpenChange={openModal}>
        <DialogTrigger asChild>
          <Button onClick={openModal}>Buy/Sell</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy/Sell Investment</DialogTitle>
            <DialogDescription>Enter the amount you want to buy or sell.</DialogDescription>
          </DialogHeader>
          <div className='p-5'>
            <label htmlFor='amount' className='block mb-2 text-lg'>
              Enter Amount:
            </label>
            <Input
              id='amount'
              type='number'
              value={amount}
              onChange={handleAmountChange}
              placeholder='Enter amount'
              className='w-full mb-4'
            />
          </div>
          <DialogFooter>
            <Button onClick={() => handleBuySell('buy')}>Buy</Button>
            <Button onClick={() => handleBuySell('sell')}>Sell</Button>
            <Button variant='ghost' onClick={closeModal}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TransactionModal;
