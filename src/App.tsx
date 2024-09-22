import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationBar } from '@/components/Navigation/NavigationBar';
import { Toaster } from './components/ui/sonner';
import { BalanceProvider } from './providers/balanceProvider';

import Routes from '@/routes';

import '@/stylesheets/globals.css';

export default function App() {
  return (
    <BalanceProvider>
      <Router>
        <main className='py-12 pl-32 max-sm:px-5 max-sm:pt-24'>
          <Routes />
          <NavigationBar />
        </main>
      </Router>
      <Toaster />
    </BalanceProvider>
  );
}
