import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationBar } from '@/components/Navigation/NavigationBar';
import { Toaster } from './components/ui/sonner';
import { BalanceProvider } from './providers/balanceProvider';
import { ThemeProvider } from './providers/themeProvider';
import { TransactionModalProvider } from './providers/modalTransactionProvider';

import Routes from '@/routes';

import '@/stylesheets/globals.css';

export default function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <BalanceProvider>
        <TransactionModalProvider>
          <Router>
            <main className='min-h-screen py-12 pl-28 pr-14 max-sm:px-5 max-sm:pt-20'>
              <Routes />
              <NavigationBar />
            </main>
          </Router>
          <Toaster />
        </TransactionModalProvider>
      </BalanceProvider>
    </ThemeProvider>
  );
}
