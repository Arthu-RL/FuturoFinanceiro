import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationBar } from '@/components/Navigation/NavigationBar';
import { Toaster } from './components/ui/sonner';
import { BalanceProvider } from './hooks/useBalance';

import Routes from '@/routes';

import '@/stylesheets/globals.css';

export default function App() {
  return (
    <BalanceProvider>
      <Router>
        <main className='min-h-screen py-12 pl-32'>
          <Routes />
          <NavigationBar />
        </main>
      </Router>
      <Toaster />
    </BalanceProvider>
  );
}
